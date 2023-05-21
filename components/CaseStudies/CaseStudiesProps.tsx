export interface CaseStudyProps {
    bannerImg?: string;
    description?: string;
    images?: string[];
    behance?: string;
    website?: string;
}


export interface CaseStudiesProps {
    thumbnail?: string;
    title?: string;
    services?: string[];
    caseStudy?: CaseStudyProps[];
}