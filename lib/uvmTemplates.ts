export type InterfaceType = "custom" | "axi-lite" | "apb";

export type UvmGenConfig = {
  name: string;
  interfaceType: InterfaceType;
  active: boolean;
  includeScoreboard: boolean;
  includeCoverage: boolean;
  includeVirtualSequencer: boolean;
};

type SignalSet = {
  ports: string;
  itemFields: string;
  driveTask: string;
  sampleTask: string;
};

function pascal(name: string): string {
  return name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

const SIGNAL_SETS: Record<InterfaceType, SignalSet> = {
  custom: {
    ports: `  logic        valid;
  logic        ready;
  logic [31:0] data;
  logic        error;`,
    itemFields: `  rand bit [31:0] data;
       bit        error;`,
    driveTask: `    vif.valid <= 1'b1;
    vif.data  <= item.data;
    @(posedge vif.clk);
    while (!vif.ready) @(posedge vif.clk);
    vif.valid <= 1'b0;`,
    sampleTask: `      @(posedge vif.clk);
      if (vif.valid && vif.ready) begin
        item.data  = vif.data;
        item.error = vif.error;
        item_collected_port.write(item);
      end`,
  },
  "axi-lite": {
    ports: `  logic [31:0] awaddr;
  logic        awvalid;
  logic        awready;
  logic [31:0] wdata;
  logic        wvalid;
  logic        wready;
  logic [1:0]  bresp;
  logic        bvalid;
  logic        bready;
  logic [31:0] araddr;
  logic        arvalid;
  logic        arready;
  logic [31:0] rdata;
  logic [1:0]  rresp;
  logic        rvalid;
  logic        rready;`,
    itemFields: `  rand bit        write;
  rand bit [31:0] addr;
  rand bit [31:0] wdata;
       bit [31:0] rdata;
       bit [1:0]  resp;`,
    driveTask: `    if (item.write) begin
      vif.awaddr  <= item.addr;
      vif.awvalid <= 1'b1;
      vif.wdata   <= item.wdata;
      vif.wvalid  <= 1'b1;
      vif.bready  <= 1'b1;
      @(posedge vif.clk);
      while (!(vif.awready && vif.wready)) @(posedge vif.clk);
      vif.awvalid <= 1'b0;
      vif.wvalid  <= 1'b0;
      while (!vif.bvalid) @(posedge vif.clk);
      item.resp = vif.bresp;
      vif.bready <= 1'b0;
    end else begin
      vif.araddr  <= item.addr;
      vif.arvalid <= 1'b1;
      vif.rready  <= 1'b1;
      @(posedge vif.clk);
      while (!vif.arready) @(posedge vif.clk);
      vif.arvalid <= 1'b0;
      while (!vif.rvalid) @(posedge vif.clk);
      item.rdata = vif.rdata;
      item.resp  = vif.rresp;
      vif.rready <= 1'b0;
    end`,
    sampleTask: `      @(posedge vif.clk);
      if (vif.awvalid && vif.awready) begin
        item.write = 1'b1;
        item.addr  = vif.awaddr;
      end
      if (vif.arvalid && vif.arready) begin
        item.write = 1'b0;
        item.addr  = vif.araddr;
      end
      if (vif.bvalid && vif.bready) begin
        item.resp = vif.bresp;
        item_collected_port.write(item);
      end
      if (vif.rvalid && vif.rready) begin
        item.rdata = vif.rdata;
        item.resp  = vif.rresp;
        item_collected_port.write(item);
      end`,
  },
  apb: {
    ports: `  logic [31:0] paddr;
  logic        pwrite;
  logic        psel;
  logic        penable;
  logic [31:0] pwdata;
  logic [31:0] prdata;
  logic        pready;
  logic        pslverr;`,
    itemFields: `  rand bit        write;
  rand bit [31:0] addr;
  rand bit [31:0] wdata;
       bit [31:0] rdata;
       bit        slverr;`,
    driveTask: `    vif.paddr   <= item.addr;
    vif.pwrite  <= item.write;
    vif.pwdata  <= item.wdata;
    vif.psel    <= 1'b1;
    vif.penable <= 1'b0;
    @(posedge vif.clk);
    vif.penable <= 1'b1;
    @(posedge vif.clk);
    while (!vif.pready) @(posedge vif.clk);
    item.rdata  = vif.prdata;
    item.slverr = vif.pslverr;
    vif.psel    <= 1'b0;
    vif.penable <= 1'b0;`,
    sampleTask: `      @(posedge vif.clk);
      if (vif.psel && vif.penable && vif.pready) begin
        item.write  = vif.pwrite;
        item.addr   = vif.paddr;
        item.wdata  = vif.pwdata;
        item.rdata  = vif.prdata;
        item.slverr = vif.pslverr;
        item_collected_port.write(item);
      end`,
  },
};

export function generateUvmTestbench(config: UvmGenConfig): Record<string, string> {
  const base = config.name.trim() || "my";
  const N = pascal(base);
  const sig = SIGNAL_SETS[config.interfaceType];
  const files: Record<string, string> = {};

  files[`${base}_if.sv`] = `interface ${base}_if (input logic clk, input logic rst_n);
${sig.ports}

  modport master (
    input clk, rst_n
    // add explicit directions per role if you need compile-time direction checks
  );

  modport slave (
    input clk, rst_n
  );
endinterface
`;

  files[`${base}_item.sv`] = `class ${N}Item extends uvm_sequence_item;
${sig.itemFields}

  \`uvm_object_utils_begin(${N}Item)
  \`uvm_object_utils_end

  function new(string name = "${N}Item");
    super.new(name);
  endfunction
endclass
`;

  files[`${base}_sequencer.sv`] = `class ${N}Sequencer extends uvm_sequencer #(${N}Item);
  \`uvm_component_utils(${N}Sequencer)

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction
endclass
`;

  files[`${base}_driver.sv`] = config.active
    ? `class ${N}Driver extends uvm_driver #(${N}Item);
  \`uvm_component_utils(${N}Driver)

  virtual ${base}_if vif;

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  function void build_phase(uvm_phase phase);
    if (!uvm_config_db#(virtual ${base}_if)::get(this, "", "vif", vif))
      \`uvm_fatal("NOVIF", "virtual interface not set for ${N}Driver")
  endfunction

  task run_phase(uvm_phase phase);
    forever begin
      ${N}Item item;
      seq_item_port.get_next_item(item);
      drive_item(item);
      seq_item_port.item_done();
    end
  endtask

  task drive_item(${N}Item item);
${sig.driveTask}
  endtask
endclass
`
    : `// Passive agent selected -- no driver generated.
// A passive agent only monitors the bus; it never drives it.
`;

  files[`${base}_monitor.sv`] = `class ${N}Monitor extends uvm_monitor;
  \`uvm_component_utils(${N}Monitor)

  virtual ${base}_if vif;
  uvm_analysis_port #(${N}Item) item_collected_port;

  function new(string name, uvm_component parent);
    super.new(name, parent);
    item_collected_port = new("item_collected_port", this);
  endfunction

  function void build_phase(uvm_phase phase);
    if (!uvm_config_db#(virtual ${base}_if)::get(this, "", "vif", vif))
      \`uvm_fatal("NOVIF", "virtual interface not set for ${N}Monitor")
  endfunction

  task run_phase(uvm_phase phase);
    ${N}Item item;
    forever begin
      item = ${N}Item::type_id::create("item");
${sig.sampleTask}
    end
  endtask
endclass
`;

  const coverageBlock = config.includeCoverage
    ? `class ${N}Coverage extends uvm_subscriber #(${N}Item);
  \`uvm_component_utils(${N}Coverage)

  ${N}Item txn;

  covergroup cg;
    option.per_instance = 1;
    cp_all_fields: coverpoint txn.addr[3:0]; // replace with fields that matter for your DUT
  endgroup

  function new(string name, uvm_component parent);
    super.new(name, parent);
    cg = new();
  endfunction

  function void write(${N}Item t);
    txn = t;
    cg.sample();
  endfunction
endclass
`
    : "";
  if (coverageBlock) files[`${base}_coverage.sv`] = coverageBlock;

  const scoreboardBlock = config.includeScoreboard
    ? `class ${N}Scoreboard extends uvm_subscriber #(${N}Item);
  \`uvm_component_utils(${N}Scoreboard)

  ${N}Item exp_q[$];
  int unsigned match_count, mismatch_count;

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  function void write(${N}Item t);
    // TODO: replace this with real expected-vs-actual comparison logic --
    // wire a reference model's output into a second analysis export instead
    // of self-checking against the same stream.
    exp_q.push_back(t);
  endfunction

  function void report_phase(uvm_phase phase);
    \`uvm_info(get_type_name(),
      $sformatf("${N}Scoreboard: %0d match, %0d mismatch", match_count, mismatch_count),
      UVM_LOW)
  endfunction
endclass
`
    : "";
  if (scoreboardBlock) files[`${base}_scoreboard.sv`] = scoreboardBlock;

  const vseqrBlock = config.includeVirtualSequencer
    ? `class ${N}VirtualSequencer extends uvm_sequencer;
  \`uvm_component_utils(${N}VirtualSequencer)

  ${N}Sequencer sqr; // add one handle per real sequencer this coordinates

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction
endclass
`
    : "";
  if (vseqrBlock) files[`${base}_vseqr.sv`] = vseqrBlock;

  const agentMembers = [
    config.active ? `  ${N}Driver    driver;` : null,
    `  ${N}Monitor   monitor;`,
    `  ${N}Sequencer sequencer;`,
  ]
    .filter(Boolean)
    .join("\n");

  const agentBuild = [
    config.active ? `    driver    = ${N}Driver::type_id::create("driver", this);` : null,
    `    monitor   = ${N}Monitor::type_id::create("monitor", this);`,
    config.active ? `    sequencer = ${N}Sequencer::type_id::create("sequencer", this);` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const agentConnect = config.active
    ? `    driver.seq_item_port.connect(sequencer.seq_item_export);`
    : `    // passive agent: no driver/sequencer to connect`;

  files[`${base}_agent.sv`] = `class ${N}Agent extends uvm_agent;
  \`uvm_component_utils(${N}Agent)

${agentMembers}

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  function void build_phase(uvm_phase phase);
${agentBuild}
  endfunction

  function void connect_phase(uvm_phase phase);
${agentConnect}
  endfunction
endclass
`;

  const envMembers = [
    `  ${N}Agent agent;`,
    config.includeScoreboard ? `  ${N}Scoreboard sb;` : null,
    config.includeCoverage ? `  ${N}Coverage cov;` : null,
    config.includeVirtualSequencer ? `  ${N}VirtualSequencer vseqr;` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const envBuild = [
    `    agent = ${N}Agent::type_id::create("agent", this);`,
    config.includeScoreboard ? `    sb    = ${N}Scoreboard::type_id::create("sb", this);` : null,
    config.includeCoverage ? `    cov   = ${N}Coverage::type_id::create("cov", this);` : null,
    config.includeVirtualSequencer
      ? `    vseqr = ${N}VirtualSequencer::type_id::create("vseqr", this);`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  const envConnect = [
    config.includeScoreboard
      ? `    agent.monitor.item_collected_port.connect(sb.analysis_export);`
      : null,
    config.includeCoverage
      ? `    agent.monitor.item_collected_port.connect(cov.analysis_export);`
      : null,
    config.includeVirtualSequencer && config.active
      ? `    vseqr.sqr = agent.sequencer;`
      : null,
  ]
    .filter(Boolean)
    .join("\n") || "    // nothing to wire beyond the agent itself";

  files[`${base}_env.sv`] = `class ${N}Env extends uvm_env;
  \`uvm_component_utils(${N}Env)

${envMembers}

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  function void build_phase(uvm_phase phase);
${envBuild}
  endfunction

  function void connect_phase(uvm_phase phase);
${envConnect}
  endfunction
endclass
`;

  files[`${base}_test.sv`] = `class ${N}BaseTest extends uvm_test;
  \`uvm_component_utils(${N}BaseTest)

  ${N}Env env;

  function new(string name, uvm_component parent);
    super.new(name, parent);
  endfunction

  function void build_phase(uvm_phase phase);
    env = ${N}Env::type_id::create("env", this);
  endfunction

  task run_phase(uvm_phase phase);
    phase.raise_objection(this);
    // TODO: create and start a sequence on env.agent.sequencer here
    #1000;
    phase.drop_objection(this);
  endtask
endclass
`;

  return files;
}
