import React, { useState } from "react";
import { useBoolean, useCounter } from "@mwakidenis/logx-react/hooks";
import { PasswordInput } from "@mwakidenis/logx-react/components";
import { DebouncedInput } from "@mwakidenis/logx-react/components";
import { required } from "@mwakidenis/logx-react/utilities/validation";

export default function App() {
  const [showPassword] = useBoolean(false);
  const { count, increment } = useCounter(0);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const emailError = required(email, "Email");

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif", maxWidth: 500 }}>
      <h1>Forms example</h1>
      <PasswordInput label="Password" value={password} onChange={setPassword} showToggle />
      <p>Show password: {showPassword ? "yes" : "no"}</p>
      <DebouncedInput label="Email" value={email} onChange={setEmail} placeholder="you@example.com" />
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      <p>Counter: {count}</p>
      <button type="button" onClick={increment}>Increment</button>
    </div>
  );
}
