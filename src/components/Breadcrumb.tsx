import { IconoCruz } from "./icons";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 lg:px-8">
      <ol className="flex items-center gap-2 text-xs text-tinta/50">
        <li>
          <a href="#inicio" className="transition hover:text-oro-600">
            Inicio
          </a>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <IconoCruz className="h-2.5 w-2.5 text-oro-400/60" />
            {item.href ? (
              <a href={item.href} className="transition hover:text-oro-600">
                {item.label}
              </a>
            ) : (
              <span className="text-tinta/30">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
