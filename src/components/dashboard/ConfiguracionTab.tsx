"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Download, Trash2, Save, RefreshCw } from "lucide-react";

export function ConfiguracionTab() {
  const { config, updateConfig } = useStore();
  const [saveLoading, setSaveLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fullName, setFullName] = useState(config.fullName);
  const [email, setEmail] = useState(config.email);
  const [password, setPassword] = useState("");

  function handleSave() {
    setSaveLoading(true);
    setSaved(false);
    setTimeout(() => {
      updateConfig({ fullName, email });
      setSaveLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Configuración</h1>
        <p className="text-sm text-slate-500 mt-1">Preferencias de tu cuenta y del sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-base">Notificaciones</CardTitle>
            <CardDescription>Controla qué alertas recibes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "notifications" as const, label: "Notificaciones push", desc: "Recibe alertas en tiempo real" },
              { key: "weeklyReport" as const, label: "Reporte semanal", desc: "Resumen de actividad por email" },
              { key: "twoFactor" as const, label: "Autenticación de dos factores", desc: "Mayor seguridad al iniciar sesión" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-700">{label}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
                <Switch
                  checked={config[key]}
                  onCheckedChange={(v) => updateConfig({ [key]: v })}
                  className="data-[state=checked]:bg-emerald-600"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System preferences */}
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-base">Preferencias del sistema</CardTitle>
            <CardDescription>Idioma, zona horaria y más</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Idioma</Label>
              <Select value={config.language} onValueChange={(v) => updateConfig({ language: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Zona horaria</Label>
              <Select value={config.timezone} onValueChange={(v) => updateConfig({ timezone: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Lima">America/Lima (UTC-5)</SelectItem>
                  <SelectItem value="America/Bogota">America/Bogota (UTC-5)</SelectItem>
                  <SelectItem value="America/Santiago">America/Santiago (UTC-4)</SelectItem>
                  <SelectItem value="America/Mexico_City">America/Mexico_City (UTC-6)</SelectItem>
                  <SelectItem value="America/Buenos_Aires">America/Buenos_Aires (UTC-3)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {saved && (
              <Alert className="border-emerald-200 bg-emerald-50">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-700">Configuración guardada correctamente.</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleSave}
              disabled={saveLoading}
              className="w-full bg-emerald-700 hover:bg-emerald-800"
            >
              {saveLoading ? <Spinner className="mr-2 h-4 w-4" /> : <Save className="h-4 w-4 mr-2" />}
              Guardar cambios
            </Button>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-base">Cuenta</CardTitle>
            <CardDescription>Actualiza tu información personal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nombre completo</Label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Tu nombre" />
            </div>
            <div className="space-y-1.5">
              <Label>Correo electrónico</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Nueva contraseña</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <Button variant="outline" className="w-full" onClick={handleSave} disabled={saveLoading}>
              <RefreshCw className="h-4 w-4 mr-2" /> Actualizar cuenta
            </Button>
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-red-100">
          <CardHeader>
            <CardTitle className="text-base text-red-700">Zona de peligro</CardTitle>
            <CardDescription>Acciones irreversibles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>Estas acciones son permanentes. Procede con mucho cuidado.</AlertDescription>
            </Alert>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" /> Exportar mis datos
            </Button>
            <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 hover:border-red-300 border-red-200">
              <Trash2 className="h-4 w-4 mr-2" /> Eliminar cuenta
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}