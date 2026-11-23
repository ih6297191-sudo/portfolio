/*
 * Add or update Ismail's approved assistant knowledge here.
 * The assistant will only answer when a question matches one of these entries.
 */
window.portfolioAssistantData = {
    name: "Ismail Siddiquee",

    knowledge: [
        {
            title: "About",
            keywords: ["about", "who", "yourself", "introduce", "name", "ismail", "summary", "student"],
            answer: "Ismail Siddiquee is a Computer Science and Engineering undergraduate at American International University-Bangladesh (AIUB). He enjoys software development, problem solving, and building practical applications."
        },
        {
            title: "Education",
            keywords: ["education", "study", "studies", "university", "college", "school", "degree", "aiub", "academic", "bsc", "hsc", "ssc"],
            answer: "Ismail is pursuing a Bachelor of Science in Computer Science and Engineering at AIUB, starting in 2025. He completed HSC at Notre Dame College Mymensingh and SSC at Govt. Fulbariya Model Pilot High School."
        },
        {
            title: "Skills",
            keywords: ["skill", "skills", "technology", "technologies", "tech", "programming", "language", "languages", "stack", "coding", "code", "python", "java", "c++", "javascript", "html", "css", "react", "node", "mysql", "git", "linux", "cloud"],
            answer: "Ismail's skills include Python, Java, C++, JavaScript, C#, HTML5, CSS3, React, Node.js, Git, MySQL, Linux, and Cloud Computing."
        },
        {
            title: "Projects",
            keywords: ["project", "projects", "work", "portfolio", "vehicle", "rental", "built", "build", "application", "website"],
            answer: "Ismail has built a Vehicle Rental Company Java console application for rentals, customer records, and bookings using text-file storage. He also built this responsive Personal Portfolio using HTML, CSS, and JavaScript."
        },
        {
            title: "Vehicle Rental Project",
            keywords: ["vehicle", "rental", "car", "booking", "java console", "text file"],
            answer: "The Vehicle Rental Company project is a beginner-level Java console application. It manages vehicles, customer records, and booking information, with text files used for storage."
        },
        {
            title: "Portfolio Project",
            keywords: ["this website", "personal portfolio", "theme", "navigation", "responsive", "portfolio project"],
            answer: "This portfolio is a responsive website built with HTML, CSS, and JavaScript. It includes theme switching, active navigation, scroll reveal effects, and a contact experience."
        },
        {
            title: "Contact",
            keywords: ["contact", "email", "mail", "linkedin", "github", "reach", "connect", "social"],
            answer: "Ismail's email is 25-62976-2@student.aiub.edu. His LinkedIn profile is linkedin.com/in/ismail-siddiquee-93b354407 and his GitHub is github.com/ih6297191-sudo."
        },
        {
            title: "ORCID",
            keywords: ["orcid", "research", "research profile", "publication", "scholar"],
            answer: "Ismail's ORCID research profile is https://orcid.org/0009-0008-0176-7138."
        }
    ],

    fallback: "I do not have that information in the portfolio data provided to me. Please contact Ismail directly for more details.",

    greetings: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    greetingAnswer: "Hello! Ask me about Ismail's profile, education, skills, projects, ORCID, or contact details."
};
