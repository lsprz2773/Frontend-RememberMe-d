import React from "react";
import { C } from "@/lib/colors";

const Divider: React.FC = () => (
    <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "4px 0" }} />
);

export default Divider;