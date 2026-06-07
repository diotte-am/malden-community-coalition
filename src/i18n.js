import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Static UI text definitions bundled directly in a single configuration file
const resources = {
  en: {
    translation: {
      "nav": { "resources": "Resources", "staff": "Our Team" },
      "resources": {
        "title": "Community Resources Directory",
        "subtitle": "Search for localized support services within Malden.",
        "search_placeholder": "Type to search... (e.g. food, tutoring, health)",
        "no_results": "No resources match your search criteria."
      },
      "resource": {
        "poc": "Contact Person",
        "phone": "Phone",
        "email": "Email",
        "visit_website": "Visit Website"
      }
    }
  },
  es: {
    translation: {
      "nav": { "resources": "Recursos", "staff": "Nuestro Equipo" },
      "resources": {
        "title": "Directorio de Recursos Comunitarios",
        "subtitle": "Busque servicios de apoyo localizados dentro de Malden.",
        "search_placeholder": "Escriba para buscar... (ej. comida, tutoría)",
        "no_results": "Ningún recurso coincide con sus criterios de búsqueda."
      },
      "resource": {
        "poc": "Persona de Contacto",
        "phone": "Teléfono",
        "email": "Correo Electrónico",
        "visit_website": "Visitar Sitio Web"
      }
    }
  },
  pt: {
    translation: {
      "nav": { "resources": "Recursos", "staff": "Nossa Equipe" },
      "resources": {
        "title": "Diretório de Recursos Comunitários",
        "subtitle": "Busque por serviços de apoio localizados em Malden.",
        "search_placeholder": "Digite para pesquisar... (ex: alimentação, tutoria)",
        "no_results": "Nenhum recurso corresponde aos seus critérios de busca."
      },
      "resource": {
        "poc": "Pessoa de Contato",
        "phone": "Telefone",
        "email": "E-mail",
        "visit_website": "Visitar Website"
      }
    }
  },
  zh: {
    translation: {
      "nav": { "resources": "社区资源", "staff": "我们的团队" },
      "resources": {
        "title": "社区资源指南",
        "subtitle": "查找莫尔登（Malden）本地的支持服务。",
        "search_placeholder": "输入开始搜索...（例如：食品、辅导、医疗）",
        "no_results": "没有找到符合您搜索条件的资源。"
      },
      "resource": {
        "poc": "联系人",
        "phone": "电话",
        "email": "电子邮箱",
        "visit_website": "访问网站"
      }
    }
  }
};

i18n
  .use(LanguageDetector) // Automatically detects user browser language
  .use(initReactI18next)   // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',     // Default language if detector fails or translation misses
    interpolation: {
      escapeValue: false   // React already protects against XSS injection
    }
  });

export default i18n;