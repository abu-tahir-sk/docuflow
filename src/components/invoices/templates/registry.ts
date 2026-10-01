import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { MinimalTemplate } from "./MinimalTemplate";
import { MinimalPremiumTemplate } from "./MinimalPremiumTemplate";
import { StubTemplate } from "./StubTemplate";


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
    {
        id: "corporate",
        name: "Corporate",
        description: "Standard corporate template with clean lines",
        component: StubTemplate,
        thumbnail: "/templates/classic-thumb.png"
    },
    {
        id: "executive",
        name: "Executive",
        description: "Premium executive layout for consulting",
        component: StubTemplate,
        thumbnail: "/templates/classic-thumb.png"
    },
    {
        id: "elegant",
        name: "Elegant",
        description: "Soft colors and elegant typography",
        component: StubTemplate,
        thumbnail: "/templates/minimal-thumb.png"
    },
    {
        id: "professional",
        name: "Professional",
        description: "Highly structured professional invoice",
        component: StubTemplate,
        thumbnail: "/templates/classic-thumb.png"
    },
    {
        id: "bold",
        name: "Bold",
        description: "High contrast and bold headings",
        component: StubTemplate,
        thumbnail: "/templates/modern-thumb.png"
    },
    {
        id: "letterhead",
        name: "Letterhead",
        description: "Designed to print on company letterhead",
        component: StubTemplate,
        thumbnail: "/templates/classic-thumb.png"
    },
    {
        id: "compact",
        name: "Compact",
        description: "Space-saving compact layout for many items",
        component: StubTemplate,
        thumbnail: "/templates/minimal-thumb.png"
    },
    {
        id: "creative",
        name: "Creative",
        description: "Creative agency style with unique layout",
        component: StubTemplate,
        thumbnail: "/templates/modern-thumb.png"
    },
    {
        id: "tech",
        name: "Tech",
        description: "Technical service invoice layout",
        component: StubTemplate,
        thumbnail: "/templates/modern-thumb.png"
    }
];