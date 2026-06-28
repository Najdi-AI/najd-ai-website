import * as React from "react";
import { Input, Label } from "najd-ui";

export const LabeledField = () => (
  <div className="w-full max-w-sm space-y-2">
    <Label htmlFor="email">Work email</Label>
    <Input id="email" type="email" placeholder="you@company.com" />
  </div>
);

export const ContactForm = () => (
  <div className="w-full max-w-sm space-y-5">
    <div className="space-y-2">
      <Label htmlFor="name">Full name</Label>
      <Input id="name" placeholder="Sultan Alshami" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="org">Organization</Label>
      <Input id="org" placeholder="Najd AI Solutions" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="need">What do you need?</Label>
      <Input id="need" placeholder="An Arabic voice agent for support…" />
    </div>
  </div>
);
