"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { TeamMember, MemberPosition } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  member?: TeamMember | null;
}

const ROLES = ["Frontend Developer", "Backend Developer", "UI/UX Designer", "DevOps Engineer", "Project Manager", "QA Engineer", "Full Stack Developer"];
const POSITIONS: MemberPosition[] = ["Junior", "Mid", "Senior", "Lead", "Principal"];

export function MemberFormModal({ open, onClose, member }: Props) {
  const { projects, addMember, updateMember } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [position, setPosition] = useState<MemberPosition>("Mid");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [projectId, setProjectId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member) {
      setName(member.name); setEmail(member.email); setRole(member.role);
      setPosition(member.position); setPhone(member.phone); setBirthdate(member.birthdate);
      setProjectId(member.projectId);
    } else {
      setName(""); setEmail(""); setRole(ROLES[0]); setPosition("Mid");
      setPhone(""); setBirthdate(""); setProjectId(null);
    }
    setError(""); setLoading(false);
  }, [member, open]);

  function handleSubmit() {
    if (!name.trim() || !email.trim()) {
      setError("Nombre y email son obligatorios.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      const data = { name: name.trim(), email: email.trim(), role, position, phone, birthdate, projectId, isActive: member?.isActive ?? true, userId: member?.userId ?? `u${Date.now()}` };
      if (member) updateMember(member.id, data);
      else addMember(data);
      setLoading(false);
      onClose();
    }, 700);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{member ? "Editar miembro" : "Nuevo miembro"}</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Nombre <span className="text-red-500">*</span></Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre completo" />
            </div>
            <div className="space-y-1.5">
              <Label>Email <span className="text-red-500">*</span></Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Rol</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Posición</Label>
              <Select value={position} onValueChange={(v) => setPosition(v as MemberPosition)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{POSITIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Teléfono</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="999-000-000" />
            </div>
            <div className="space-y-1.5">
              <Label>Fecha de nacimiento</Label>
              <Input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Proyecto asignado</Label>
            <Select value={projectId ? String(projectId) : "none"} onValueChange={(v) => setProjectId(v === "none" ? null : Number(v))}>
              <SelectTrigger><SelectValue placeholder="Sin proyecto" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— Sin proyecto —</SelectItem>
                {projects.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.title}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading && <div className="flex justify-center py-2"><Spinner className="text-emerald-600" /></div>}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-emerald-700 hover:bg-emerald-800">
            {member ? "Actualizar" : "Agregar miembro"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}