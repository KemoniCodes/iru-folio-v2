export interface CaseStudyProps {
    bannerImg?: string;
    description?: string;
    caseStudyLayoutImg?: string;
    website?: string;
}


export interface CaseStudiesProps {
    thumbnail?: string;
    title?: string;
    services?: string[];
    caseStudy?: CaseStudyProps[];
}