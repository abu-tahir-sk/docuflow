import Link from "next/link"
import { Globe, Mail, MessageCircle, ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-background pt-24 pb-8 border-t border-border/40">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#5b61f4]/10 dark:bg-[#5b61f4]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 w-fit">
              <div className="bg-[#5b61f4] rounded-full w-10 h-10 flex items-center justify-center shadow-[0_0_15px_rgba(91,97,244,0.4)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
              <span className="font-bold text-2xl tracking-tight font-sans text-foreground">DocuFlow</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed font-sans">
              Manage all your business documents, invoices, and clients easily from a beautifully designed modern platform.
            </p>
            
            <div className="flex flex-col space-y-3">
              <p className="text-sm font-semibold text-foreground">Subscribe to our newsletter</p>
              <div className="flex max-w-sm relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-muted/50 border border-border/50 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5b61f4]/50 transition-all placeholder:text-muted-foreground/70"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-[#5b61f4] hover:bg-[#4f54d4] text-white rounded-full w-8 flex items-center justify-center transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:ml-auto">
            <h4 className="font-semibold mb-5 text-foreground">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">Templates</Link></li>
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div className="lg:ml-auto">
            <h4 className="font-semibold mb-5 text-foreground">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="lg:ml-auto">
            <h4 className="font-semibold mb-5 text-foreground">Resources</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-medium">
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-[#5b61f4] transition-colors">Community</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground font-medium">© 2026 DocuFlow. All rights reserved.</p>
          
          <div className="flex items-center space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-[#5b61f4] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-[#5b61f4] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/><path d="M9 18c-4.5 1.6-5-2.3-5-2.3"/></svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-[#5b61f4] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground font-medium">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
