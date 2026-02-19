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
    year: "2021–2022",
    title: "Double Honours in BBA & Economics",
    organization: "National University of Singapore",
    description:
      "Foundational training in business administration and economics, with an emphasis on analytical thinking.",
  },
  {
    year: "2022–2024",
    title: "Signal & Computer Administration Specialist",
    organization: "Republic of Korea Army, 35th Infantry Division HQ",
    description:
      "Managed IT and communication systems at Division HQ, supporting 120+ personnel. Maintained 40+ computer systems and network terminals.",
  },
  {
    year: "2024",
    title: "Transferred to Computer Science",
    organization: "National University of Singapore",
    description:
      "Made an intentional pivot from Double Honours in BBA and Economics to Bachelor of Computing (Computer Science) to pursue technical specialization.",
  },
  {
    year: "2024–2026",
    title: "Developer Group @ NUS Computing",
    organization: "Developer Group @ NUS Computing",
    description: "",
    roles: [
      {
        title: "Head of Technology",
        period: "2025 – 2026",
        description:
          "Designed the organization website and organized Hack4Good 2026, a flagship hackathon for non-profit organizations.",
      },
      {
        title: "Technology Associate",
        period: "2024 – 2025",
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
];
