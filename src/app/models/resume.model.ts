export interface Resume {
    resume: {
      profile: {
        name: string;
        summary: string;
        email: string;
        phone: string;
        url: string;
        location: string;
      };
      workExperiences: {
        company: string;
        jobTitle: string;
        date: string;
        descriptions: string[];
      }[];
      educations: {
        school: string;
        degree: string;
        gpa: string;
        date: string;
        descriptions: string[];
      }[];
      projects: {
        project: string;
        date: string;
        descriptions: string[];
      }[];
      skills: {
        featuredSkills: {
          skill: string;
          rating: boolean[];
        }[];
        descriptions: string[];
      };
    };
  }