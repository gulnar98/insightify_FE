import NavItem from "@/components/Navigation/NavItem";
import NavList from "@/components/Navigation/NavList";
import Header from "@/components/Header";
import Head from "next/head";
import Collapse from "@/components/Navigation/Collapse";
import { useState } from "react";

const navItems = [
  {
    label: "Overview",
    iconName: "overview",
    path: "/overview",
  },
  {
    label: "Dashboard",
    iconName: "dashboard",
    path: "/dashboard",
  },
  {
    label: "Highlights",
    iconName: "highlights",
    path: "/highlights",
  },
  {
    label: "Trends",
    iconName: "trends",
    path: "/trends",
  },
  {
    label: "Funnels",
    iconName: "funnels",
    path: "/funnels",
    soon: true,
  },
  {
    label: "Recording",
    iconName: "recording",
    path: "/recording",
  },
  {
    label: "Heatmaps",
    iconName: "heatmaps",
    path: "/heatmaps",
    soon: true,
  },
  {
    label: "Feedback",
    iconName: "feedback",
    path: "/feedback",
  },
  {
    label: "Surveys",
    iconName: "surveys",
    path: "/surveys",
  },
  {
    label: "Engage",
    iconName: "engage",
    path: "/engage",
    soon: true,
  },
];

export default function Test({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Test page</title>
      </Head>

      <Header />

      <NavList direction={"vertical"} isOpen={isOpen}>
        {navItems.map((item, index) => (
          <NavItem key={`item-${index}`} {...item} isOpen={isOpen}>
            {item.label}
          </NavItem>
        ))}
        <Collapse setIsOpen={setIsOpen} isOpen={isOpen}>
          Collapse
        </Collapse>
      </NavList>
    </>
  );
}
