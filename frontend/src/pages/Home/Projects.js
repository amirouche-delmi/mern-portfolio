import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;

  // Inversez l'ordre des projets
  const reversedProjects = [...projects].reverse();

  // Obtenez les liens du projet sélectionné
  const links = reversedProjects[selectedItemIndex]?.link || "";
  const [link1, link2] = links.split(' '); // Divisez les liens en deux parties

  return (
    <div>
      <SectionTitle title="Projets" />

      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/4 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {reversedProjects.map((project, index) => (
            <div
              className="cursor-pointer min-w-60"
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              key={index}
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3"
                    : "text-white"
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img
            src={reversedProjects[selectedItemIndex]?.image}
            alt="img"
            width={"300px"}
          />
          <div className="flex flex-col gap-5 w-3/4">
            <h1 className="text-secondary text-xl">
              {reversedProjects[selectedItemIndex]?.title}
            </h1>
            <p className="text-white">
              {reversedProjects[selectedItemIndex]?.description}
            </p>
            <p className="text-white">
              {/* Code source :{" "} */}
              {link1 && (
                <a
                  href={link1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2"
                >
                  {link1}
                </a>
              )}
              {link2 && (
                <a
                  href={link2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <br />
                  {link2}
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
