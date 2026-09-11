import type { ReactNode } from "react";
import type { PageSection, SectionComponentName, Categoria, Producto } from "../types";
import Portada from "./Portada";
import Cinta from "./Cinta";
import Colecciones from "./Colecciones";
import Catalogo from "./Catalogo";
import Taller from "./Taller";
import Sacramentos from "./Sacramentos";
import Nosotros from "./Nosotros";

interface DynamicPageProps {
  sections: PageSection[];
  onExplorar: () => void;
  esAdmin: boolean;
  productos: Producto[];
  categoria: Categoria | "todos";
  onCategoria: (c: Categoria | "todos") => void;
  busqueda: string;
  onBusqueda: (b: string) => void;
  onVer: (p: Producto) => void;
  onEditar: (p: Producto) => void;
  onEliminar: (id: string) => void;
  favoritos: string[];
  onToggleFavorito: (id: string) => void;
  esFavorito: (id: string) => boolean;
  irA: (id: string) => void;
}

function renderSection(
  name: SectionComponentName,
  props: DynamicPageProps
): ReactNode {
  switch (name) {
    case "Portada":
      return (
        <Portada
          onExplorar={props.onExplorar}
          esAdmin={props.esAdmin}
          productos={props.productos}
        />
      );
    case "Cinta":
      return <Cinta />;
    case "Colecciones":
      return (
        <Colecciones
          onCategoria={(c) => {
            props.onCategoria(c);
            props.irA("catalogo");
          }}
          irA={props.irA}
        />
      );
    case "Catalogo":
      return (
        <Catalogo
          productos={props.productos}
          categoria={props.categoria}
          onCategoria={props.onCategoria}
          busqueda={props.busqueda}
          onBusqueda={props.onBusqueda}
          onVer={props.onVer}
          esAdmin={props.esAdmin}
          onEditar={props.onEditar}
          onEliminar={props.onEliminar}
          favoritos={props.favoritos}
          onToggleFavorito={props.onToggleFavorito}
          esFavorito={props.esFavorito}
        />
      );
    case "Taller":
      return <Taller />;
    case "Sacramentos":
      return <Sacramentos />;
    case "Nosotros":
      return <Nosotros />;
    default:
      return null;
  }
}

export default function EpikasDynamicPage(props: DynamicPageProps) {
  const sorted = [...props.sections]
    .filter((s) => s.is_active)
    .sort((a, b) => a.order_index - b.order_index);

  return (
    <>
      {sorted.map((section) => (
        <section key={section.id}>
          {renderSection(section.component_name, props)}
        </section>
      ))}
    </>
  );
}
