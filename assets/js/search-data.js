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
          section: "News",},{id: "news-faultovis-was-submitted-to-ieee-transactions-on-industrial-informatics",
          title: 'FaultOvis was submitted to IEEE Transactions on Industrial Informatics.',
          description: "",
          section: "News",},{id: "news-vsllava-was-published-in-advanced-engineering-informatics",
          title: 'VSLLaVA was published in Advanced Engineering Informatics.',
          description: "",
          section: "News",},{id: "projects-vision-based-local-map-construction-for-autonomous-driving",
          title: 'Vision-based Local Map Construction for Autonomous Driving',
          description: "End-to-end local HD map construction from multi-view camera images using BEV representations.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/autonomous-mapping/";
            },},{id: "projects-faultovis-domain-generalized-vlm-for-fault-diagnosis",
          title: 'FaultOvis: Domain-Generalized VLM for Fault Diagnosis',
          description: "Domain-generalized vision-language adaptation for rolling bearing diagnosis under unseen working conditions.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/faultovis/";
            },},{id: "projects-vibalign-learning-language-aligned-signal-tokens",
          title: 'VibAlign: Learning Language-Aligned Signal Tokens',
          description: "Raw physical-signal tokenization for industrial diagnosis and robotic tactile perception.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/vibalign/";
            },},{id: "projects-vsllava-multimodal-foundation-models-for-vibration-analysis",
          title: 'VSLLaVA: Multimodal Foundation Models for Vibration Analysis',
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
