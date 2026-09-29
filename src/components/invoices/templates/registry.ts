import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { MinimalTemplate } from "./MinimalTemplate";
import { MinimalPremiumTemplate } from "./MinimalPremiumTemplate";
// Import remaining 12 templates...

export const INVOICE_TEMPLATES = [
    {
        id: "classic",
        name: "Classic",
        description: "Traditional professional business invoice",
        component: ClassicTemplate,
        thumbnail: "/templates/classic-thumb.png"
    },
    {
        id: "modern",
        name: "Modern Corporate",
        description: "Modern SaaS-style invoice with bold branding",
        component: ModernTemplate,
        thumbnail: "/templates/modern-thumb.png"
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean whitespace with strong typography",
        component: MinimalTemplate,
        thumbnail: "/templates/minimal-thumb.png"
    },
    {
        id: "minimal-premium",
        name: "Minimal Premium",
        description: "Extremely minimalist and premium layout like Stripe/Vercel",
        component: MinimalPremiumTemplate,
        thumbnail: "/templates/minimal-thumb.png"
    },
    // Register remaining templates (Corporate, Executive, Elegant, etc.)
];