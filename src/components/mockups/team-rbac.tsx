"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Settings, Eye, Edit3, Trash2, Check, Shield } from "lucide-react"

export function TeamRbacMockup() {
  const members = [
    { name: "Abu Tahir", role: "Owner", email: "abu@docuflow.com", avatar: "A", color: "bg-blue-500" },
    { name: "Sarah Khan", role: "Admin", email: "sarah@docuflow.com", avatar: "S", color: "bg-purple-500" },
    { name: "Rafiq Islam", role: "Staff", email: "rafiq@docuflow.com", avatar: "R", color: "bg-orange-500" },
    { name: "Joya Ahsan", role: "Viewer", email: "joya@docuflow.com", avatar: "J", color: "bg-green-500" },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-border/50 bg-background/50 backdrop-blur-xl overflow-hidden relative">
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />
      
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" /> Team & Roles
            </h3>
            <p className="text-xs text-muted-foreground">Manage workspace access and permissions</p>
          </div>
          <div className="p-2 bg-muted rounded-md border border-border/50">
             <Settings className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-y border-border/50">
              <tr>
                <th className="px-4 py-3 font-medium">Team Member</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 text-center font-medium" title="View Documents"><Eye className="w-4 h-4 mx-auto"/></th>
                <th className="px-4 py-3 text-center font-medium" title="Create & Edit"><Edit3 className="w-4 h-4 mx-auto"/></th>
                <th className="px-4 py-3 text-center font-medium" title="Delete"><Trash2 className="w-4 h-4 mx-auto"/></th>
                <th className="px-4 py-3 text-center font-medium" title="Manage Settings"><Shield className="w-4 h-4 mx-auto"/></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {members.map((member, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${member.color}`}>
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{member.name}</div>
                        <div className="text-[10px] text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                      member.role === 'Owner' ? 'bg-blue-500/10 text-blue-500' :
                      member.role === 'Admin' ? 'bg-purple-500/10 text-purple-500' :
                      member.role === 'Staff' ? 'bg-orange-500/10 text-orange-500' :
                      'bg-green-500/10 text-green-500'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  {/* Permissions Checklist */}
                  <td className="px-4 py-3 text-center">
                    <Check className="w-4 h-4 text-primary mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    {(member.role === 'Owner' || member.role === 'Admin' || member.role === 'Staff') ? 
                      <Check className="w-4 h-4 text-primary mx-auto" /> : 
                      <span className="text-muted-foreground/30">-</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {(member.role === 'Owner' || member.role === 'Admin') ? 
                      <Check className="w-4 h-4 text-primary mx-auto" /> : 
                      <span className="text-muted-foreground/30">-</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {member.role === 'Owner' ? 
                      <Check className="w-4 h-4 text-primary mx-auto" /> : 
                      <span className="text-muted-foreground/30">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
