export interface RoleEntry {
  title: string;
  period: string;
  description: string;
}

export interface ExperienceEntry {
  year: string;
  title: string;
  organization: string;
  description: string;
  roles?: RoleEntry[];
}

export const experiences: ExperienceEntry[] = [
  {
    year: "2021",
    title: "IB Diploma — 45/45 (Top 1%)",
    organization: "International School of Kuala Lumpur",
    description:
      "Achieved distinctions in Mathematics, Chemistry, Business, Economics, English, and Korean. Awarded IB Bilingual Diploma.",
  },
  {
    year: "2022–2024",
    title: "Signal & Computer Administration Specialist",
    organization: "Republic of Korea Army, 35th Infantry Division HQ",
    description:
      "Managed IT and communication systems at Division HQ, supporting 120+ personnel. Maintained 40+ computer systems and network terminals.",
  },
  {
    year: "2025–2026",
    title: "Developer Group @ NUS Computing",
    organization: "National University of Singapore",
    description: "",
    roles: [
      {
        title: "Head of Technology",
        period: "2026",
        description:
          "Designed the organization website and organized Hack4Good 2026, a flagship hackathon for non-profit organizations.",
      },
      {
        title: "Technology Associate",
        period: "2025",
        description:
          "Contributed to a student-led tech community with 2,300+ followers.",
      },
    ],
  },
  {
    year: "2025–2026",
    title: "Data Center Systems Intern",
    organization: "Lumcloon Energy",
    description:
      "Authored a 46-page internal assessment on Ireland's LEU framework. Modeled grid capacity constraints for hyperscale deployment and identified a 73MW capacity deficit.",
  },
  {
    year: "2026",
    title: "Open Source Developer",
    organization: "Mojaloop Foundation",
    description:
      "Strengthening Mojaloop, an open-source real-time payments platform driving financial inclusion across emerging economies. Closing FSPIOP API test-coverage gaps in the Platform Quality & Security workstream.",
  },
  {
    year: "2026",
    title: "Open Source Developer",
    organization: "Open Government Products",
    description:
      "Building and maintaining FormSG, Singapore's open-source form builder used by government agencies to collect data securely from citizens. Contributing to a product that processes millions of responses across public sector workflows.",
  },
  {
    year: "2026",
    title: "AI Engineer Intern",
    organization: "Keppel Ltd.",
    description:
      "Developing AI integrations for enterprise applications, working across SAP and internal systems to automate and enhance business workflows.",
  },
];
