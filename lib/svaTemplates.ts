export type SvaPatternId =
  | "implication"
  | "rose-fell-stable"
  | "one-hot"
  | "handshake"
  | "fifo-no-overflow"
  | "stable-window";

export type SvaField = {
  key: string;
  label: string;
  default: string;
  placeholder?: string;
};

export type SvaPattern = {
  id: SvaPatternId;
  label: string;
  description: string;
  fields: SvaField[];
  generate: (v: Record<string, string>) => string;
};

function header(name: string, clk: string, rst: string): string {
  return `property ${name};
  @(posedge ${clk}) disable iff (!${rst})`;
}

export const SVA_PATTERNS: SvaPattern[] = [
  {
    id: "implication",
    label: "Basic implication (if A, then B within N cycles)",
    description: "The most common SVA shape: when a condition fires, something else must follow within a bounded window.",
    fields: [
      { key: "clk", label: "Clock signal", default: "clk" },
      { key: "rst", label: "Reset signal (active-high)", default: "rst_n" },
      { key: "name", label: "Property name", default: "p_implication" },
      { key: "antecedent", label: "Trigger condition", default: "req" },
      { key: "consequent", label: "Required consequence", default: "gnt" },
      { key: "min", label: "Min cycles later", default: "1" },
      { key: "max", label: "Max cycles later", default: "4" },
    ],
    generate: (v) => `${header(v.name, v.clk, v.rst)}
    ${v.antecedent} |-> ##[${v.min}:${v.max}] ${v.consequent};
endproperty

${v.name}_check: assert property (${v.name})
  else \`uvm_error("SVA", $sformatf("%s did not lead to %s within [${v.min}:${v.max}] cycles at time %0t", "${v.antecedent}", "${v.consequent}", $time));`,
  },
  {
    id: "rose-fell-stable",
    label: "$rose / $fell edge-triggered check",
    description: "Trigger a check specifically on the transition of a signal, not on every cycle it holds a value.",
    fields: [
      { key: "clk", label: "Clock signal", default: "clk" },
      { key: "rst", label: "Reset signal (active-high)", default: "rst_n" },
      { key: "name", label: "Property name", default: "p_edge_check" },
      { key: "signal", label: "Signal to detect edge on", default: "req" },
      { key: "edge", label: "Edge type", default: "rose" },
      { key: "consequent", label: "Required consequence", default: "gnt" },
      { key: "delay", label: "Cycles later", default: "1" },
    ],
    generate: (v) => `${header(v.name, v.clk, v.rst)}
    $${v.edge}(${v.signal}) |-> ##${v.delay} ${v.consequent};
endproperty

${v.name}_check: assert property (${v.name})
  else \`uvm_error("SVA", $sformatf("$${v.edge}(%s) did not lead to %s at time %0t", "${v.signal}", "${v.consequent}", $time));`,
  },
  {
    id: "one-hot",
    label: "One-hot / mutual exclusion check",
    description: "Verify that at most one (or exactly one) bit of a bus is set at a time -- common for grant/select/state signals.",
    fields: [
      { key: "clk", label: "Clock signal", default: "clk" },
      { key: "rst", label: "Reset signal (active-high)", default: "rst_n" },
      { key: "name", label: "Property name", default: "p_one_hot" },
      { key: "signal", label: "Bus signal", default: "gnt_bus" },
      { key: "mode", label: "Mode", default: "onehot" },
    ],
    generate: (v) => `${header(v.name, v.clk, v.rst)}
    $${v.mode}(${v.signal});
endproperty

${v.name}_check: assert property (${v.name})
  else \`uvm_error("SVA", $sformatf("%s violated $${v.mode} at time %0t, value=%0b", "${v.signal}", $time, ${v.signal}));`,
  },
  {
    id: "handshake",
    label: "Request/ack handshake stability",
    description: "req must stay asserted, unchanged, until ack arrives -- catches drivers that drop req early.",
    fields: [
      { key: "clk", label: "Clock signal", default: "clk" },
      { key: "rst", label: "Reset signal (active-high)", default: "rst_n" },
      { key: "name", label: "Property name", default: "p_req_stable_until_ack" },
      { key: "req", label: "Request signal", default: "req" },
      { key: "ack", label: "Ack signal", default: "ack" },
      { key: "max", label: "Max cycles to wait for ack", default: "8" },
    ],
    generate: (v) => `sequence s_${v.req}_stable;
  ${v.req} throughout (##[1:${v.max}] ${v.ack});
endsequence

${header(v.name, v.clk, v.rst)}
    ${v.req} |-> s_${v.req}_stable;
endproperty

${v.name}_check: assert property (${v.name})
  else \`uvm_error("SVA", $sformatf("${v.req} dropped or ${v.ack} missing within ${v.max} cycles at time %0t", $time));`,
  },
  {
    id: "fifo-no-overflow",
    label: "FIFO no overflow / underflow",
    description: "Never write to a full FIFO, never read from an empty one.",
    fields: [
      { key: "clk", label: "Clock signal", default: "clk" },
      { key: "rst", label: "Reset signal (active-high)", default: "rst_n" },
      { key: "name", label: "Property name prefix", default: "p_fifo" },
      { key: "wr_en", label: "Write-enable signal", default: "wr_en" },
      { key: "full", label: "Full flag", default: "fifo_full" },
      { key: "rd_en", label: "Read-enable signal", default: "rd_en" },
      { key: "empty", label: "Empty flag", default: "fifo_empty" },
    ],
    generate: (v) => `${header(`${v.name}_no_overflow`, v.clk, v.rst)}
    not (${v.wr_en} && ${v.full});
endproperty

${header(`${v.name}_no_underflow`, v.clk, v.rst)}
    not (${v.rd_en} && ${v.empty});
endproperty

${v.name}_overflow_check:  assert property (${v.name}_no_overflow)
  else \`uvm_error("SVA", $sformatf("Write attempted while FIFO full at time %0t", $time));

${v.name}_underflow_check: assert property (${v.name}_no_underflow)
  else \`uvm_error("SVA", $sformatf("Read attempted while FIFO empty at time %0t", $time));`,
  },
  {
    id: "stable-window",
    label: "Signal must stay stable across a window",
    description: "Common for address/control signals that must not glitch mid-transfer.",
    fields: [
      { key: "clk", label: "Clock signal", default: "clk" },
      { key: "rst", label: "Reset signal (active-high)", default: "rst_n" },
      { key: "name", label: "Property name", default: "p_addr_stable" },
      { key: "trigger", label: "Window start condition", default: "psel && !penable" },
      { key: "signal", label: "Signal that must stay stable", default: "paddr" },
      { key: "endcond", label: "Window end condition", default: "penable[->1]" },
    ],
    generate: (v) => `${header(v.name, v.clk, v.rst)}
    (${v.trigger}) |=> $stable(${v.signal}) throughout (${v.endcond});
endproperty

${v.name}_check: assert property (${v.name})
  else \`uvm_error("SVA", $sformatf("%s glitched during the protected window at time %0t", "${v.signal}", $time));`,
  },
];

export function getPattern(id: SvaPatternId): SvaPattern {
  return SVA_PATTERNS.find((p) => p.id === id) ?? SVA_PATTERNS[0];
}
