import React from "react";
import { C } from "@/lib/Colors";

const Divider: React.FC = () => (
    <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "12px 0" }} />
);

export default Divider;