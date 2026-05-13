export const HALAL_POLICIES_BASE_PATH = "/offices/halal-services/policies" as const;

export type HalalPolicyIcon =
  | "book"
  | "ban"
  | "check"
  | "factory"
  | "clipboard"
  | "star"
  | "document"
  | "scale"
  | "shield"
  | "users"
  | "currency"
  | "list"
  | "mail"
  | "lock"
  | "alert"
  | "handshake"
  | "gavel"
  | "chat"
  | "userCog"
  | "search"
  | "checkSquare"
  | "usersTalk"
  | "arrowUpRight"
  | "clock"
  | "globe"
  | "userPlus";

export type HalalPolicySection = {
  title: string;
  items: { icon: HalalPolicyIcon; text: string }[];
};

export type HalalPolicyDefinition = {
  slug: string;
  label: string;
  pageTitle: string;
  subtitle: string;
  sections: HalalPolicySection[];
};

export const HALAL_POLICIES: HalalPolicyDefinition[] = [
  {
    slug: "no-pork-policy",
    label: "No Pork Policy",
    pageTitle: "ORIASC-HCB No Pork Policy",
    subtitle:
      "Understanding the Islamic dietary laws and their implementation in certification",
    sections: [
      {
        title: "Introduction",
        items: [
          {
            icon: "book",
            text: "Islam is a holistic way of life, taking into account physical, spiritual, and emotional well-being. The dietary laws in Islam are designed to promote good health and maintain spiritual purity.",
          },
        ],
      },
      {
        title: "The Prohibition",
        items: [
          {
            icon: "ban",
            text: "A Muslim spends his or her life endeavoring to please God by worshiping Him and obeying His laws. One of the laws is that Muslims are prohibited from consuming pork and pork products.",
          },
          {
            icon: "check",
            text: "This prohibition is clearly stated in the Quran and is one of the fundamental dietary laws in Islam.",
          },
        ],
      },
      {
        title: "Implementation",
        items: [
          {
            icon: "factory",
            text: "ORIASC-HCB ensures that all certified facilities strictly adhere to the no-pork policy in their operations, production processes, and supply chains.",
          },
          {
            icon: "clipboard",
            text: "Regular audits and inspections are conducted to verify compliance with this policy.",
          },
        ],
      },
      {
        title: "Certification Requirements",
        items: [
          {
            icon: "star",
            text: "Facilities seeking certification must demonstrate complete separation from pork products and implement strict controls to prevent cross-contamination.",
          },
          {
            icon: "document",
            text: "Documentation and procedures must be in place to ensure compliance with the no-pork policy at all times.",
          },
        ],
      },
    ],
  },
  {
    slug: "impartial-policy",
    label: "Impartial Policy",
    pageTitle: "ORIASC-HCB Impartial Policy",
    subtitle: "Ensuring fairness and objectivity in our certification processes",
    sections: [
      {
        title: "Introduction",
        items: [
          {
            icon: "scale",
            text: "ORIASC-HCB is committed to maintaining impartiality in all its certification activities. This policy outlines our approach to ensuring objectivity and fairness in our certification processes.",
          },
        ],
      },
      {
        title: "Confidentiality Obligations",
        items: [
          {
            icon: "users",
            text: "All personnel involved in certification activities are bound by confidentiality agreements. This includes auditors, technical experts, and administrative staff.",
          },
          {
            icon: "lock",
            text: "Information obtained during certification processes is treated as confidential and is not disclosed to third parties without explicit consent.",
          },
        ],
      },
      {
        title: "Disclosure Rules",
        items: [
          {
            icon: "alert",
            text: "Personnel must disclose any potential conflicts of interest that may affect their impartiality in certification activities.",
          },
          {
            icon: "handshake",
            text: "Any relationships with clients that could compromise objectivity must be reported to management.",
          },
        ],
      },
      {
        title: "Legal Requirements",
        items: [
          {
            icon: "gavel",
            text: "ORIASC-HCB complies with all applicable laws and regulations regarding impartiality in certification activities.",
          },
          {
            icon: "document",
            text: "Certification decisions are made based on objective evidence and documented procedures.",
          },
        ],
      },
      {
        title: "Third-Party Access",
        items: [
          {
            icon: "users",
            text: "Third parties may be granted access to certification information only with explicit consent from the certified client.",
          },
          {
            icon: "shield",
            text: "All third-party access is logged and monitored to ensure compliance with confidentiality requirements.",
          },
        ],
      },
    ],
  },
  {
    slug: "compliant-policy",
    label: "Compliant Policy",
    pageTitle: "ORIASC-HCB Compliant Policy",
    subtitle: "Ongoing conformity, corrective action, and responsibilities of certified clients",
    sections: [
      {
        title: "Introduction",
        items: [
          {
            icon: "book",
            text: "Certification is not a one-time event. Certificate holders must maintain conformity with the approved scheme, applicable standards, and conditions communicated at the time of certification.",
          },
        ],
      },
      {
        title: "Ongoing conformity",
        items: [
          {
            icon: "factory",
            text: "Clients implement and maintain controls across operations, suppliers, and product changes so that Halal integrity is preserved throughout the certification cycle.",
          },
          {
            icon: "clipboard",
            text: "Changes that may affect compliance—such as new ingredients, new lines, or new sites—are communicated to ORIASC-HCB in line with scheme rules.",
          },
        ],
      },
      {
        title: "Corrective action & surveillance",
        items: [
          {
            icon: "star",
            text: "Non-conformities identified during audits are addressed within agreed timeframes, with evidence of effective correction where required.",
          },
          {
            icon: "document",
            text: "Surveillance and follow-up activities verify that the client remains compliant and that documentation remains accurate and current.",
          },
        ],
      },
    ],
  },
  {
    slug: "procedure-for-supervision",
    label: "Procedure for Supervision",
    pageTitle: "ORIASC-HCB Procedure for Supervision",
    subtitle: "How surveillance, audits, and oversight maintain the integrity of Halal certification",
    sections: [
      {
        title: "Introduction",
        items: [
          {
            icon: "book",
            text: "Supervision activities ensure that certified clients continue to meet scheme requirements between certification cycles and after significant changes to products, processes, or sites.",
          },
        ],
      },
      {
        title: "Surveillance planning",
        items: [
          {
            icon: "clipboard",
            text: "Surveillance frequency and scope are determined by risk, product category, and prior audit findings, in line with the approved scheme and accreditation expectations.",
          },
          {
            icon: "factory",
            text: "On-site and remote supervisory visits may include traceability checks, document review, and interviews with responsible personnel.",
          },
        ],
      },
      {
        title: "Reporting & follow-up",
        items: [
          {
            icon: "document",
            text: "Findings from supervisory activities are recorded and communicated to the client with clear expectations for correction or evidence of conformity.",
          },
          {
            icon: "check",
            text: "Closure of non-conformities is verified before certification status is maintained or restored, as applicable.",
          },
        ],
      },
    ],
  },
  {
    slug: "suspension-termination-procedure",
    label: "Procedure for Suspension or Termination",
    pageTitle: "ORIASC-HCB Procedure for Suspension or Termination",
    subtitle:
      "Comprehensive guidelines for maintaining certification standards and compliance",
    sections: [
      {
        title: "Overview",
        items: [
          {
            icon: "alert",
            text: "This procedure describes suspension, restrictions, notification, investigation, and costs in line with ORIASC-HCB scheme rules.",
          },
        ],
      },
    ],
  },
  {
    slug: "provision-use-oriasc-hcb",
    label: "Provision for the Use of ORIASC",
    pageTitle: "Provision for the Use of ORIASC",
    subtitle: "Guidelines and requirements for using ORIASC certification and marks",
    sections: [
      {
        title: "Provision",
        items: [
          {
            icon: "document",
            text: "The full provision for use of marks and certification references is published on the dedicated provision page.",
          },
        ],
      },
    ],
  },
  {
    slug: "complaints-appeals-procedure",
    label: "Complaints and Appeals Procedure",
    pageTitle: "Complaints and Appeals Procedure",
    subtitle:
      "Guidelines for handling complaints, appeals, and review requests at ORIASC-HCB",
    sections: [
      {
        title: "Full procedure",
        items: [
          {
            icon: "document",
            text: "The complete SOP is available on the dedicated procedure page and as a downloadable PDF.",
          },
        ],
      },
    ],
  },
  {
    slug: "fees-structure",
    label: "Fees Structure",
    pageTitle: "ORIASC-HCB Fees Structure",
    subtitle:
      "Oromia Region Islamic Affairs Supreme Council Department of Halal Certification (ORIASC-HCB)",
    sections: [
      {
        title: "Full schedule",
        items: [
          {
            icon: "currency",
            text: "The detailed fee tables, notes, and contact information are published on the dedicated fees page and as a downloadable PDF.",
          },
        ],
      },
    ],
  },
  {
    slug: "scheme-document",
    label: "Scheme Document",
    pageTitle: "ORIASC-HCB Scheme Document",
    subtitle: "Halal Certification Conditions & Application Requirements",
    sections: [
      {
        title: "Full scheme",
        items: [
          {
            icon: "document",
            text: "The authoritative scheme document, conditions table, and application requirements are published on the dedicated scheme page and as a downloadable PDF.",
          },
        ],
      },
    ],
  },
  {
    slug: "list-of-clients",
    label: "List of Certified Clients",
    pageTitle: "ORIASC-HCB List of Certified Clients",
    subtitle:
      "Discover our network of certified halal establishments and their services",
    sections: [
      {
        title: "Directory",
        items: [
          {
            icon: "users",
            text: "The certified clients directory with search and filters is published on the dedicated list page.",
          },
        ],
      },
    ],
  },
];

export function getHalalPolicyBySlug(slug: string): HalalPolicyDefinition | undefined {
  return HALAL_POLICIES.find((p) => p.slug === slug);
}

export function getOtherHalalPolicies(currentSlug: string) {
  return HALAL_POLICIES.filter((p) => p.slug !== currentSlug).map((p) => ({
    slug: p.slug,
    label: p.label,
  }));
}

/** Sidebar group matching governance / impartial policy mockup (includes current page). */
export const HALAL_GOVERNANCE_SIDEBAR_SLUGS = [
  "impartial-policy",
  "compliant-policy",
  "complaints-appeals-procedure",
  "procedure-for-supervision",
  "suspension-termination-procedure",
  "provision-use-oriasc-hcb",
  "scheme-document",
  "fees-structure",
  "list-of-clients",
] as const;

export function isGovernanceSidebarPolicy(slug: string): boolean {
  return (HALAL_GOVERNANCE_SIDEBAR_SLUGS as readonly string[]).includes(slug);
}

export function getPolicySidebarItems(currentSlug: string): {
  slug: string;
  label: string;
  isCurrent: boolean;
}[] {
  if (isGovernanceSidebarPolicy(currentSlug)) {
    return HALAL_GOVERNANCE_SIDEBAR_SLUGS.map((slug) => {
      const p = getHalalPolicyBySlug(slug);
      return {
        slug,
        label: p?.label ?? slug,
        isCurrent: slug === currentSlug,
      };
    });
  }
  return getOtherHalalPolicies(currentSlug).map((o) => ({
    ...o,
    isCurrent: false,
  }));
}

export const HALAL_POLICY_NAV = HALAL_POLICIES.map((p) => ({
  slug: p.slug,
  label: p.label,
}));

/**
 * Policy links for the Halal Services department: priority order for quick access,
 * then any remaining policies from HALAL_POLICIES.
 */
export const HALAL_DEPARTMENT_QUICK_ACCESS_ORDER: readonly string[] = [
  "provision-use-oriasc-hcb",
  "no-pork-policy",
  "scheme-document",
  "fees-structure",
  "complaints-appeals-procedure",
  "impartial-policy",
  "compliant-policy",
  "procedure-for-supervision",
  "suspension-termination-procedure",
  "list-of-clients",
];

export function getHalalDepartmentPolicyNav(): { slug: string; label: string }[] {
  const bySlug = new Map(
    HALAL_POLICIES.map((p) => [p.slug, { slug: p.slug, label: p.label }])
  );
  const seen = new Set<string>();
  const out: { slug: string; label: string }[] = [];
  for (const slug of HALAL_DEPARTMENT_QUICK_ACCESS_ORDER) {
    const item = bySlug.get(slug);
    if (item) {
      out.push(item);
      seen.add(slug);
    }
  }
  for (const p of HALAL_POLICIES) {
    if (!seen.has(p.slug)) {
      out.push({ slug: p.slug, label: p.label });
    }
  }
  return out;
}
