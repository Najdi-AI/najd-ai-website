import * as React from "react";
import { Input, Label } from "najd-ui";

export const Field = () => (
  <div className="w-full max-w-sm space-y-2">
    <Label htmlFor="email">Work email</Label>
    <Input id="email" type="email" placeholder="name@company.com" />
  </div>
);

export const FieldGroup = () => (
  <div className="grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <Label htmlFor="fname">Full name</Label>
      <Input id="fname" placeholder="Sultan Alshami" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="org">Organization</Label>
      <Input id="org" placeholder="Najd AI Solutions" />
    </div>
  </div>
);

export const ArabicField = () => (
  <div dir="rtl" className="w-full max-w-sm space-y-2">
    <Label htmlFor="bemail">البريد المؤسسي</Label>
    <Input id="bemail" type="email" placeholder="name@company.com" />
  </div>
);
