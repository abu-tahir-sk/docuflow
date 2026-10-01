import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { MinimalTemplate } from "./MinimalTemplate";
import { MinimalPremiumTemplate } from "./MinimalPremiumTemplate";
import { StubTemplate } from "./StubTemplate";
import { BoldTemplate } from "./BoldTemplate";
import { CreativeTemplate } from "./CreativeTemplate";

export const INVOICE_TEMPLATES = [
    {
        id: "classic",
        name: "Classic",
        description: "Traditional professional business invoice",
        component: ClassicTemplate,
        thumbnail: "/templates/template-1.jpg"
    },
    {
        id: "modern",
        name: "Modern Corporate",
        description: "Modern SaaS-style invoice with bold branding",
        component: BoldTemplate,
        thumbnail: "/templates/template-2.jpg"
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean whitespace with strong typography",
        component: CreativeTemplate,
        thumbnail: "/templates/template-3.jpg"
    },
    {
        id: "minimal-premium",
        name: "Minimal Premium",
        description: "Extremely minimalist and premium layout like Stripe/Vercel",
        component: CreativeTemplate,
        thumbnail: "/templates/template-3.jpg"
    },
    {
        id: "corporate",
        name: "Corporate",
        description: "Standard corporate template with clean lines",
        component: ClassicTemplate,
        thumbnail: "/templates/template-1.jpg"
    },
    {
        id: "executive",
        name: "Executive",
        description: "Premium executive layout for consulting",
        component: ClassicTemplate,
        thumbnail: "/templates/template-1.jpg"
    },
    {
        id: "elegant",
        name: "Elegant",
        description: "Soft colors and elegant typography",
        component: CreativeTemplate,
        thumbnail: "/templates/template-3.jpg"
    },
    {
        id: "professional",
        name: "Professional",
        description: "Highly structured professional invoice",
        component: ClassicTemplate,
        thumbnail: "/templates/template-1.jpg"
    },
    {
        id: "bold",
        name: "Bold",
        description: "High contrast and bold headings",
        component: BoldTemplate,
        thumbnail: "/templates/template-2.jpg"
    },
    {
        id: "letterhead",
        name: "Letterhead",
        description: "Designed to print on company letterhead",
        component: ClassicTemplate,
        thumbnail: "/templates/template-1.jpg"
    },
    {
        id: "compact",
        name: "Compact",
        description: "Space-saving compact layout for many items",
        component: CreativeTemplate,
        thumbnail: "/templates/template-3.jpg"
    },
    {
        id: "creative",
        name: "Creative",
        description: "Creative agency style with unique layout",
        component: BoldTemplate,
        thumbnail: "/templates/template-2.jpg"
    },
    {
        id: "tech",
        name: "Tech",
        description: "Technical service invoice layout",
        component: BoldTemplate,
        thumbnail: "/templates/template-2.jpg"
    }
];