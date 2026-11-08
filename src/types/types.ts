export type SectionProps = {
    onNavigate: (id: string) => void;
    close: boolean;
};

export type TechItemWithCount = TechItem & { projectCount: number };
export type TechStackWithCount = Omit<TechStack, "items"> & {
    items: TechItemWithCount[];
};

export type Project = {
    title: string;
    slug: string;
    updatedAt: string;
    description: string;
    longDescription: string;
    category: string;
    tech: string[];
    fit?: "cover" | "contain";
    image: string;
    projectImg: string[];
    demo?: string;
    status: string;
    year: string;
};

export type TechItem = {
    name: string;
    logo: string;
    description: string;
    startDate: string;
};

export type TechStack = {
    category: string;
    icon: string;
    items: TechItem[];
};
