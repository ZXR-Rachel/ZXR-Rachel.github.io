// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about-me",
    title: "About Me",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "Research projects in physical-signal intelligence, multimodal learning, industrial diagnosis, and robotic perception.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "Publications and manuscripts in physical-signal intelligence and multimodal learning.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Education, research experience, awards, teaching, and technical skills.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-i-was-featured-in-a-hunan-university-official-media-student-profile-for-my-undergraduate-academic-journey-in-chinese",
          title: 'I was featured in a Hunan University official media student profile for my...',
          description: "",
          section: "News",},{id: "news-i-am-preparing-ph-d-applications-and-developing-my-research-portfolio-on-physical-signal-foundation-models",
          title: 'I am preparing Ph.D. applications and developing my research portfolio on physical-signal foundation...',
          description: "",
          section: "News",},{id: "news-vsllava-was-published-in-advanced-engineering-informatics",
          title: 'VSLLaVA was published in Advanced Engineering Informatics.',
          description: "",
          section: "News",},{id: "news-the-paper-margin-aware-bidirectional-mamba-for-imbalanced-cross-condition-bearing-fault-diagnosis-was-accepted-at-icarce-2026-vibalign-iadg-bimamba-and-faultovis-are-under-review-at-engineering-applications-of-artificial-intelligence-ieee-sensors-journal-and-applied-soft-computing-respectively",
          title: 'The paper “Margin-Aware Bidirectional Mamba for Imbalanced Cross-Condition Bearing Fault Diagnosis” was accepted...',
          description: "",
          section: "News",},{id: "projects-vision-based-local-map-construction-for-autonomous-driving",
          title: 'Vision-based Local Map Construction for Autonomous Driving',
          description: "End-to-end local HD map construction from multi-view camera images using BEV representations.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/autonomous-mapping/";
            },},{id: "projects-faultovis-a-generative-discriminative-vision-language-framework-for-domain-generalized-rolling-bearing-fault-diagnosis",
          title: 'FaultOvis: A Generative-Discriminative Vision-Language Framework for Domain-Generalized Rolling Bearing Fault Diagnosis',
          description: "Generative diagnosis and visual discriminative reinforcement across unseen bearing operating conditions.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/faultovis/";
            },},{id: "projects-iadg-bimamba-imbalance-aware-domain-generalization-for-bearing-fault-diagnosis",
          title: 'IADG-BiMamba: Imbalance-Aware Domain Generalization for Bearing Fault Diagnosis',
          description: "Raw-vibration diagnosis under class-imbalanced source data and unseen operating conditions.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/iadg-bimamba/";
            },},{id: "projects-vibalign-direct-vibration-signal-to-language-modeling-with-large-language-models-for-fault-diagnosis-and-tactile-perception",
          title: 'VibAlign: Direct Vibration Signal-to-Language Modeling with Large Language Models for Fault Diagnosis and...',
          description: "Direct 1-D vibration-to-language modeling for bearing diagnosis and robotic tactile perception.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/vibalign/";
            },},{id: "projects-vsllava-a-pipeline-for-large-multimodal-foundation-models-in-industrial-vibration-signal-analysis",
          title: 'VSLLaVA: A pipeline for Large Multimodal Foundation Models in industrial vibration signal analysis...',
          description: "Expert-guided multimodal instruction tuning and GRPO refinement for industrial vibration signal analysis.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/vsllava/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/cv/cv-xinran-zhang.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%78%69%6E%72%61%6E-%7A%32%34@%6D%61%69%6C%73.%74%73%69%6E%67%68%75%61.%65%64%75.%63%6E", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/ZXR-Rachel", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=MIjD1JwAAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0002-0328-5294", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
