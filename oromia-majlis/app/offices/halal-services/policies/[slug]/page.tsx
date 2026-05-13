import { notFound } from "next/navigation";
import CertifiedClientsListView from "@/components/offices/CertifiedClientsListView";
import ComplaintsAppealsProcedureView from "@/components/offices/ComplaintsAppealsProcedureView";
import FeesStructureView from "@/components/offices/FeesStructureView";
import HalalPolicyPageLayout from "@/components/offices/HalalPolicyPageLayout";
import ProvisionUseOriasView from "@/components/offices/ProvisionUseOriasView";
import SchemeDocumentView from "@/components/offices/SchemeDocumentView";
import SuspensionTerminationProcedureView from "@/components/offices/SuspensionTerminationProcedureView";
import { getHalalPolicyBySlug, HALAL_POLICIES } from "@/lib/halalPolicies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return HALAL_POLICIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const policy = getHalalPolicyBySlug(slug);
  if (!policy) {
    return { title: "Policy" };
  }
  if (slug === "complaints-appeals-procedure") {
    return {
      title: "Complaints and Appeals Procedure | ORIASC-HCB",
      description: policy.subtitle,
    };
  }
  if (slug === "fees-structure") {
    return {
      title: "ORIASC-HCB Fees Structure | ORIASC-HCB",
      description: policy.subtitle,
    };
  }
  if (slug === "scheme-document") {
    return {
      title: "ORIASC-HCB Scheme Document | ORIASC-HCB",
      description: policy.subtitle,
    };
  }
  if (slug === "list-of-clients") {
    return {
      title: "ORIASC-HCB List of Certified Clients | ORIASC-HCB",
      description: policy.subtitle,
    };
  }
  if (slug === "provision-use-oriasc-hcb") {
    return {
      title: "Provision for the Use of ORIASC | ORIASC-HCB",
      description: policy.subtitle,
    };
  }
  if (slug === "suspension-termination-procedure") {
    return {
      title: "Procedure for Suspension or Termination | ORIASC-HCB",
      description: policy.subtitle,
    };
  }
  return {
    title: `${policy.label} | ORIASC-HCB`,
    description: policy.subtitle,
  };
}

export default async function HalalPolicyPage({ params }: PageProps) {
  const { slug } = await params;
  const policy = getHalalPolicyBySlug(slug);
  if (!policy) {
    notFound();
  }
  if (slug === "complaints-appeals-procedure") {
    return <ComplaintsAppealsProcedureView />;
  }
  if (slug === "fees-structure") {
    return <FeesStructureView />;
  }
  if (slug === "scheme-document") {
    return <SchemeDocumentView />;
  }
  if (slug === "list-of-clients") {
    return <CertifiedClientsListView />;
  }
  if (slug === "provision-use-oriasc-hcb") {
    return <ProvisionUseOriasView />;
  }
  if (slug === "suspension-termination-procedure") {
    return <SuspensionTerminationProcedureView />;
  }
  return <HalalPolicyPageLayout policy={policy} />;
}
