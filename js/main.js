/* Bazana Digital — interações e micro-animações */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: fundo mais sólido ao rolar ---------- */
  var header = document.getElementById("site-header");
  function onScrollHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest(".nav-link")) {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach(function (el) {
    var delay = el.getAttribute("data-reveal-delay");
    if (delay) el.style.setProperty("--reveal-delay", delay + "ms");
  });

  if ("IntersectionObserver" in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Contadores animados (17+, 20+, 55+) ---------- */
  var counters = document.querySelectorAll(".stat-number[data-count]");
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + "+";
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && !reducedMotion) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------- Link ativo no menu conforme a seção visível ---------- */
  var sections = ["cases", "trabalhos", "sobre", "depoimentos"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = document.querySelectorAll(".nav-link");

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- Idioma PT / EN ---------- */
  var translations = {
    // Header
    "Trabalhos": "Works",
    "Sobre": "About",
    "Depoimentos": "Testimonials",
    "Vamos Trabalhar Juntos": "Let's Work Together",
    // Hero
    "PRODUCT DESIGNER SENIOR · UX/UI": "SENIOR PRODUCT DESIGNER · UX/UI",
    "Produtos digitais que fazem marcas crescerem.": "Digital products that make brands grow.",
    "Ajudo empresas de médio e grande porte a transformar complexidade em produtos digitais escaláveis e orientados a resultado.": "I help mid-sized and large companies turn complexity into scalable, results-driven digital products.",
    "Entre em contato": "Get in touch",
    // Cases
    "Do problema de negócio ao produto no ar.": "From business problem to shipped product.",
    "EM BREVE": "COMING SOON",
    "APP MOBILE": "MOBILE APP",
    "Contratação Pravaler: jornada mais curta, menos abandono": "Pravaler enrollment: shorter journey, less drop-off",
    "Redesenho da jornada de contratação do financiamento estudantil: menos passos no fluxo e queda expressiva na taxa de abandono.": "Redesign of the student-financing enrollment journey: fewer steps in the flow and a sharp drop in abandonment rate.",
    "Fretes sem fila: 65% menos tempo de espera": "Freight without the queue: 65% less waiting time",
    "App mobile que conecta motoristas a novas cargas em tempo real e reduziu em 65% o tempo de espera na fila por novos fretes.": "Mobile app that connects drivers to new cargo in real time, cutting queue time for new freight by 65%.",
    // Trabalhos
    "TRABALHOS SELECIONADOS": "SELECTED WORKS",
    "Projetos onde a usabilidade virou resultado.": "Projects where usability turned into results.",
    "CodeMalta Site": "CodeMalta Website",
    "Criação do site de transformação digital empresa CodeMalta": "Website design for the digital transformation company CodeMalta",
    "WebSite": "Website",
    "Case": "Case study",
    "Redesign Site Pravaler": "Pravaler Website Redesign",
    "Criação de um super app B2B automotivo para aumentar a conversão em 30%": "B2B automotive super app designed to raise conversion by 30%",
    "Portfólio": "Portfolio",
    "Plataforma gamificada que premia todos os clientes que possuem conta no BB": "Gamified platform that rewards every Banco do Brasil account holder",
    "Plataforma": "Platform",
    "Campanha interna para seguradores que premiam os vencedores com cashback": "Internal campaign for insurance agents that rewards winners with cashback",
    "Plataforma gamificada que premia clientes portadores dos cartões Ourocard": "Gamified platform that rewards Ourocard cardholders",
    "Plataforma SaaS, voltada para a gestão e automatização de processos": "SaaS platform for process management and automation",
    // Bento / Sobre
    "Experiência": "Experience",
    "Designer de Produto Consultor": "Product Design Consultant",
    "Designer de Produto Especialista": "Specialist Product Designer",
    "Designer de Produto Senior": "Senior Product Designer",
    "UX/UI Designer Senior": "Senior UX/UI Designer",
    "UX/UI Designer Pleno": "Mid-level UX/UI Designer",
    "UX/UI Designer Junior": "Junior UX/UI Designer",
    "Sobre mim": "About me",
    "Sou Cassio Bazana, Designer há mais de 17 anos. Ajudo empresas de médio e grande porte a transformar problemas complexos em produtos digitais que as pessoas usam e o negócio sente no resultado. Meu trabalho conecta dados, comportamento do usuário e objetivos de negócio, da estratégia inicial à interface final.": "I'm Cassio Bazana, a designer for over 17 years. I help mid-sized and large companies turn complex problems into digital products people actually use — with results the business can feel. My work connects data, user behavior and business goals, from early strategy to the final interface.",
    "Contato": "Contact",
    "Curriculum": "Resume",
    "Ferramentas": "Tools",
    "Anos de Experiência": "Years of Experience",
    "Criando produtos digitais para médias e grandes empresas.": "Building digital products for mid-sized and large companies.",
    "Empresas atendidas": "Companies served",
    "De startups a grandes marcas que confiaram no meu trabalho.": "From startups to big brands that trusted my work.",
    "Projetos e serviços": "Projects and services",
    "Entre apps, sistemas e sites, do conceito ao lançamento.": "Across apps, systems and websites, from concept to launch.",
    // Depoimentos
    "DEPOIMENTOS": "TESTIMONIALS",
    "Quem trabalhou comigo, recomenda.": "People who've worked with me recommend me.",
    "Lead Prduct Design": "Lead Product Design",
    "O Cassio é uma pessoa muito dedicada, sempre disposto a buscar mais conhecimento em disciplinas complementares como pesquisa, metodologia ágil e facilitação. Além disso, era uma grande referência para o time no conhecimento técnico sobre UI, componentização e design system!": "Cassio is a very dedicated person, always willing to learn more in complementary disciplines such as research, agile methodology and facilitation. He was also a great reference for the team in technical knowledge of UI, componentization and design systems!",
    "Cassio é muito comprometido com seu trabalho, competente, talentoso e prestativo com todos. Quando trabalhamos juntos no Pravaler liderou com maestria o desenvolvimento do nosso design system. Sempre muito presente em todas as discussões do chapter, Cassio estava sempre disposto a ajudar mesmo quando muito atarefado, sua dedicação e seriedade fez com que naturalmente os outros designers o enxergassem como uma forte referência para o time. Vou sentir falta de ter um cara como o Cassio ao meu lado para resolver os perrengues. Foi muito bom trabalhar e aprender contigo, continue incrível.": "Cassio is deeply committed to his work — competent, talented and helpful to everyone. When we worked together at Pravaler he masterfully led the development of our design system. Always present in every chapter discussion, Cassio was willing to help even when swamped; his dedication and seriousness naturally made the other designers see him as a strong reference for the team. I'll miss having a guy like Cassio by my side to solve the tough problems. It was great working and learning with you — stay amazing.",
    "Cassio é um designer com muita experiência, com skills de colaboração, visão de negócio, e que incorpora inteligência artificial no processo de design. Ao ter atuado em contextos internacionais e em projetos para diversos clientes, ele traz uma bagagem de multiculturalidade e multidisciplinariedade, que é muito importante para grandes entregas de valor. Cassio agrega muito técnicamente em qualquer time onde participa e traz leveza para o ambiente de trabalho.": "Cassio is a highly experienced designer with collaboration skills, business vision, and a practice that brings artificial intelligence into the design process. Having worked in international contexts and on projects for many clients, he carries a multicultural, multidisciplinary background that is essential for delivering great value. Cassio adds a lot technically to any team he joins and brings lightness to the work environment.",
    "Cassio é um cara incrível, tem ótimas habilidades de Designer e de desenvolvedor. Compreende a essência do produto e consegue entregar propostas fáceis de implementar e que de fato entregam valor para o usuário. Com certeza uma grande referência pra mim :)": "Cassio is an amazing guy with great designer and developer skills. He understands the essence of the product and delivers proposals that are easy to implement and truly valuable to users. Definitely a big reference for me :)",
    // Footer
    "Vamos criar algo incrível?": "Shall we create something amazing?",
    // Feedbacks de interação
    "E-mail copiado!": "Email copied!",
    // ===== Página de projeto: Holmes =====
    "Voltar": "Back",
    "PLATAFORMA SAAS B2B · AUTOMAÇÃO DE PROCESSOS": "B2B SAAS PLATFORM · PROCESS AUTOMATION",
    "Plataforma que reúne automação de processos, gestão de documentos e IA para dar às empresas controle total da operação — sem código. Desenhei funcionalidades que tornam criar, aprovar e acompanhar fluxos algo simples.": "A platform that brings together process automation, document management and AI to give companies full control of their operation — no code. I designed features that make creating, approving and tracking workflows simple.",
    "Papel": "Role",
    "Time": "Team",
    "Foco": "Focus",
    "7 pessoas": "7 people",
    "Design System e novas funcionalidades": "Design System and new features",
    // Sobre o projeto
    "O PROJETO": "THE PROJECT",
    "Uma plataforma que dá às empresas controle total da operação.": "A platform that gives companies full control of their operation.",
    "O Holmes é uma plataforma SaaS B2B que reúne, em um só lugar, a automação de processos, a gestão de documentos e a inteligência artificial. Com um construtor de fluxos sem código, empresas de diferentes segmentos desenham seus próprios processos, centralizam documentos e ganham rastreabilidade de ponta a ponta — sem depender da TI.": "Holmes is a B2B SaaS platform that brings process automation, document management and artificial intelligence together in one place. With a no-code flow builder, companies across different segments design their own processes, centralize documents and gain end-to-end traceability — without depending on IT.",
    "Entrei nesse contexto como Product Designer dentro de uma squad multidisciplinar. Meu papel ia do entendimento do problema à interface final: alinhava as prioridades com o time, investigava a fundo cada necessidade, levantava hipóteses, prototipava soluções e acompanhava o desenvolvimento até o fim — garantindo que o que chegava ao usuário fosse fiel ao que foi desenhado.": "I joined this context as a Product Designer within a multidisciplinary squad. My role went from understanding the problem to the final interface: I aligned priorities with the team, investigated each need in depth, raised hypotheses, prototyped solutions and followed development through to the end — making sure what reached the user stayed true to what was designed.",
    // O que eu fazia
    "O QUE EU FAZIA": "WHAT I DID",
    "Da descoberta do problema à entrega acompanhada de perto.": "From discovering the problem to delivery followed up close.",
    "Discovery & Benchmark": "Discovery & Benchmark",
    "Investigava o problema com os stakeholders e analisava referências de mercado antes de desenhar qualquer solução.": "I investigated the problem with stakeholders and analyzed market references before designing any solution.",
    "Fluxos & Hipóteses": "Flows & Hypotheses",
    "Transformava necessidades em hipóteses e fluxos claros, sempre alinhados com a squad.": "I turned needs into clear hypotheses and flows, always aligned with the squad.",
    "Protótipos": "Prototypes",
    "Prototipava novas funcionalidades para validar ideias rápido, antes de entrar em desenvolvimento.": "I prototyped new features to validate ideas quickly, before moving into development.",
    "UI & Interface": "UI & Interface",
    "Desenhava as telas dos módulos com consistência visual e foco em usabilidade.": "I designed the module screens with visual consistency and a focus on usability.",
    "Design System": "Design System",
    "Criei e mantive a guia de estilos do produto, padronizando componentes e acelerando o time.": "I created and maintained the product's style guide, standardizing components and speeding up the team.",
    "Handoff & Acompanhamento": "Handoff & Follow-up",
    "Documentava e acompanhava o desenvolvimento de perto, garantindo fidelidade ao design.": "I documented and followed development closely, ensuring fidelity to the design.",
    // Módulos
    "MÓDULOS": "MODULES",
    "As áreas do produto onde atuei.": "The areas of the product I worked on.",
    "Construtor de fluxos": "Flow builder",
    "O coração do produto: montar processos conectando etapas de forma visual e sem código. Cada etapa carrega seus campos e documentos no mesmo lugar, para que quem desenha o fluxo enxergue tudo o que será pedido e aprovado ao longo dele.": "The heart of the product: building processes by connecting steps visually and without code. Each step carries its own fields and documents in one place, so whoever designs the flow can see everything that will be requested and approved along the way.",
    "Gestão de documentos": "Document management",
    "Central de busca que reúne documentos, processos e tabelas em um só ponto, com rastreabilidade e status de cada arquivo.": "A search hub that brings documents, processes and tables together in one place, with traceability and status for every file.",
    "Administração": "Administration",
    "Ponto de entrada que centraliza fluxos, usuários, grupos, tabelas, automações e portais — com os itens recentes sempre à mão.": "The entry point that centralizes flows, users, groups, tables, automations and portals — with recent items always within reach.",
    "Usuários e acessos": "Users and access",
    "Gestão de quem entra e do que cada um pode fazer, com busca, filtro avançado e ações em lote sobre a listagem.": "Managing who gets in and what each person can do, with search, advanced filtering and bulk actions across the list.",
    // Design system
    "DESIGN SYSTEM": "DESIGN SYSTEM",
    "Uma guia de estilos para todo o produto.": "A style guide for the whole product.",
    "Criei e mantive a guia de estilos do Holmes — paleta, escala tipográfica e componentes documentados. Foi o que trouxe consistência entre os módulos e acelerou tanto o desenho de novas telas quanto o desenvolvimento delas.": "I created and maintained the Holmes style guide — palette, type scale and documented components. That's what brought consistency across modules and sped up both designing new screens and building them.",
    "Paleta e tokens de cor": "Color palette and tokens",
    "Escala tipográfica": "Type scale",
    // Ganhos
    "GANHOS ALCANÇADOS": "RESULTS ACHIEVED",
    "Consistência, velocidade e uma percepção melhor.": "Consistency, speed and a better perception.",
    "Interface padronizada": "Standardized interface",
    "O design system trouxe consistência visual e de comportamento para todo o produto.": "The design system brought visual and behavioral consistency to the whole product.",
    "Mais velocidade": "More speed",
    "Criação e desenvolvimento de protótipos muito mais rápidos, com componentes reaproveitáveis.": "Much faster prototype creation and development, with reusable components.",
    "Clientes mais satisfeitos": "More satisfied clients",
    "Melhora na percepção dos clientes ao criar e aprovar fluxos no dia a dia.": "An improved client perception when creating and approving flows day to day.",
    // CTA projeto
    "Ver todos os trabalhos": "See all works",

    // ===== Página de projeto: Fretes sem fila =====
    "APP MOBILE · LOGÍSTICA E AGRONEGÓCIO": "MOBILE APP · LOGISTICS & AGRIBUSINESS",
    "Fretes sem fila": "Freight without the queue",
    "App que conecta caminhoneiros às melhores cargas em tempo real e reorganiza a fila nas fábricas, reduzindo em 65% o tempo de espera por novos fretes.": "A mobile app that connects truck drivers to the best loads in real time and reorganizes the queue at the plants, cutting waiting time for new freight by 65%.",
    "Product Designer, do início à entrega do MVP": "Product Designer, from kickoff to MVP delivery",
    "PM e 3 UX Designers": "PM and 3 UX Designers",
    "Pesquisa de campo, UX e definição do produto": "Field research, UX and product definition",
    // O desafio
    "O DESAFIO": "THE CHALLENGE",
    "Dias parados na fila enquanto as melhores cargas ficavam com intermediários.": "Days lost in the queue while the best loads went to middlemen.",
    "Uma das maiores exportadoras de grãos do país enfrentava um gargalo caro na ponta logística: caminhoneiros perdiam dias em fila para carregar e descarregar milho e soja nas fábricas, e a emissão das ordens de carregamento vivia congestionada.": "One of the country's largest grain exporters faced a costly bottleneck at the logistics edge: truck drivers lost days queuing to load and unload corn and soy at the plants, and issuing loading orders was constantly jammed.",
    "Do outro lado, o motorista autônomo ficava com o pior dos dois mundos: as melhores cargas eram capturadas por intermediários em grupos de WhatsApp, e sobravam a ele os fretes ruins, quando sobravam.": "On the other side, the independent driver got the worst of both worlds: the best loads were captured by middlemen in WhatsApp groups, leaving him the bad freight, when any was left.",
    "O pedido era direto: reduzir o tempo perdido na fila por novos fretes e dar aos caminhoneiros acesso às melhores cargas. Entrei como Product Designer atuando de ponta a ponta, da pesquisa inicial à entrega do MVP.": "The ask was direct: cut the time lost queuing for new freight and give drivers access to the best loads. I joined as Product Designer working end to end, from initial research to MVP delivery.",
    // A pesquisa
    "A PESQUISA": "THE RESEARCH",
    "Antes de desenhar uma tela, fui a campo.": "Before designing a single screen, I went to the field.",
    "Entrevistei e observei caminhoneiros em três regiões com perfis opostos, de motoristas mais velhos, com baixa escolaridade e desconfiados de tecnologia, a autônomos jovens e fluentes em apps. Rodei um benchmark de 8 aplicativos de frete, construí 4 personas, mapeei a jornada de ponta a ponta e posicionei o produto contra os concorrentes.": "I interviewed and observed truck drivers across three regions with opposite profiles, from older, low-literacy drivers wary of technology to young, app-fluent independents. I ran a benchmark of 8 freight apps, built 4 personas, mapped the end-to-end journey and positioned the product against competitors.",
    "O WhatsApp já era o sistema operacional do frete": "WhatsApp was already the operating system of freight",
    "90% usavam smartphone, mas a carga circulava por grupos, não por apps. Competir com isso exigia falar a mesma língua, não substituí-la.": "90% used a smartphone, but loads moved through groups, not apps. Competing meant speaking the same language, not replacing it.",
    "Desconfiança profunda": "Deep distrust",
    "O motorista tinha medo de apertar botões e confirmar operações sem enxergar a consequência da ação.": "Drivers were afraid to press buttons and confirm actions without seeing the consequence.",
    "Agendar não garantia frete": "Scheduling didn't guarantee freight",
    "Nos concorrentes, dava para agendar, mas a carga raramente era liberada depois, o que virava frustração e abandono.": "With competitors you could schedule, but the load was rarely released afterward, which turned into frustration and drop-off.",
    "Nenhuma transparência de valor": "No price transparency",
    "Ninguém mostrava o valor final do frete nem o piso mínimo da ANTT antes do aceite.": "No one showed the final freight value or the ANTT minimum rate before accepting.",
    "Intermediários no meio do caminho": "Middlemen in the way",
    "Grupos e cooperativas capturavam as melhores cargas, penalizando quem operava sozinho.": "Groups and co-ops captured the best loads, penalizing those who worked alone.",
    // Princípios de design
    "PRINCÍPIOS DE DESIGN": "DESIGN PRINCIPLES",
    "Cada tela decidida pela pesquisa, não por achismo.": "Every screen decided by research, not guesswork.",
    "Sem medo de errar": "No fear of mistakes",
    "Cada ação confirmável mostra a consequência e permite cancelar sem punição. Foi o que destravou a desconfiança.": "Every confirmable action shows its consequence and can be cancelled without penalty. That's what unlocked the distrust.",
    "A língua do caminhoneiro": "The driver's language",
    "Ícones e padrões que ele já reconhece (WhatsApp, placas de estrada), textos curtos e diretos, poucas telas por tarefa.": "Icons and patterns they already know (WhatsApp, road signs), short direct copy, few screens per task.",
    "Transparência de valor": "Price transparency",
    "Simulação com valor final e km da origem ao destino, e o piso da ANTT sempre visível.": "Simulation with final value and km from origin to destination, and the ANTT floor always visible.",
    "Agendar é receber": "Scheduling means loading",
    "O agendamento passa a efetivamente liberar a carga e gerar a ordem, acabando com a promessa vazia.": "Scheduling now actually releases the load and issues the order, ending the empty promise.",
    "Primeiro acesso livre": "Free first access",
    "Ver cargas e simular frete sem cadastro obrigatório, reduzindo a barreira de entrada.": "Browse loads and simulate freight with no mandatory signup, lowering the barrier to entry.",
    // A solução
    "A SOLUÇÃO": "THE SOLUTION",
    "Um app desenhado para o motorista, não para a operação.": "An app designed for the driver, not for operations.",
    "As decisões da pesquisa viraram quatro capacidades centrais.": "The research decisions became four core capabilities.",
    "Visão geral da viagem": "The trip at a glance",
    "Ao abrir o app, o motorista já vê a próxima viagem, origem e destino, a carga e os atalhos principais. Tudo o que importa numa tela, sem precisar procurar.": "The moment the driver opens the app, the next trip, origin and destination, cargo and key shortcuts are right there. Everything that matters on one screen, no searching.",
    "Cargas em tempo real": "Real-time loads",
    "O motorista vê as cargas de soja e milho disponíveis na hora, com busca por rota, filtros e o valor por tonelada. Cada uma marcada como sem intermediário.": "The driver sees available soy and corn loads instantly, with route search, filters and the price per ton — each one marked as no-middleman.",
    "Frete transparente": "Transparent freight",
    "Simulação com o valor final do frete, km da origem ao destino e o piso mínimo da ANTT sempre visível. O motorista sabe quanto vai receber antes de aceitar.": "Simulation with the final freight value, km from origin to destination and the ANTT minimum always visible. The driver knows what he'll earn before accepting.",
    "O agendamento efetivamente libera a carga e gera a ordem de carregamento no app, acabando com a promessa vazia dos concorrentes.": "Scheduling actually releases the load and generates the loading order in the app, ending competitors' empty promises.",
    "Antes de confirmar, o motorista vê exatamente o que está agendando e a mensagem de que pode cancelar depois, sem multa. É o que tira o medo de apertar o botão.": "Before confirming, the driver sees exactly what he's scheduling and the message that he can cancel later, with no penalty. That's what takes away the fear of tapping the button.",
    // Resultados
    "RESULTADOS": "RESULTS",
    "Menos espera, mais previsibilidade.": "Less waiting, more predictability.",
    "−65% no tempo de espera": "−65% waiting time",
    "Menos tempo perdido na fila por novos fretes.": "Less time lost in the queue for new freight.",
    "Fila reorganizada": "Reorganized queue",
    "Uma fila mais previsível e justa para o motorista.": "A more predictable, fairer queue for the driver.",
    "Boa adoção": "Strong adoption",
    "Boa adesão dos caminhoneiros já na fase inicial.": "Strong uptake among drivers in the early phase.",
    // Placeholders de imagem (mockups em breve)
    "Imagem principal · mockup do app": "Hero image · app mockup",
    "Imagem · pesquisa de campo, personas ou jornada": "Image · field research, personas or journey",
    "Benchmark de 8 apps de frete": "Benchmark of 8 freight apps",
    "Uma das 4 personas de motorista": "One of the 4 driver personas",
    "Mapa de jornada de ponta a ponta": "End-to-end journey map",
    "Tela · lista de cargas": "Screen · loads list",
    "Tela · simulação de frete": "Screen · freight simulation",
    "Tela · agendamento e ordem": "Screen · scheduling and order",
    "Tela · confirmação e fila": "Screen · confirmation and queue",
    "em breve": "coming soon"
  };

  // Indexa os nós de texto traduzíveis uma única vez
  var i18nNodes = [];
  (function indexTextNodes() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var key = node.nodeValue.replace(/\s+/g, " ").trim();
      if (key && Object.prototype.hasOwnProperty.call(translations, key)) {
        i18nNodes.push({ node: node, pt: node.nodeValue, en: translations[key] });
      }
    }
  })();

  // Imagens que trocam junto com o idioma (ex.: fechamento Obrigado / Thanks)
  var i18nImages = Array.prototype.slice.call(
    document.querySelectorAll("img[data-src-pt][data-src-en]")
  );

  var langLabel = document.getElementById("lang-label");
  var langSwitch = document.getElementById("lang-switch");
  var langMenu = document.getElementById("lang-menu");

  function setLang(lang) {
    i18nNodes.forEach(function (item) {
      item.node.nodeValue = lang === "en" ? item.en : item.pt;
    });
    i18nImages.forEach(function (img) {
      var src = img.getAttribute(lang === "en" ? "data-src-en" : "data-src-pt");
      if (src && img.getAttribute("src") !== src) img.setAttribute("src", src);
      var alt = img.getAttribute(lang === "en" ? "data-alt-en" : "data-alt-pt");
      if (alt) img.setAttribute("alt", alt);
    });
    // Currículo: abre o PDF do idioma ativo (PT / EN)
    document.querySelectorAll("a[data-href-pt][data-href-en]").forEach(function (link) {
      var href = link.getAttribute(lang === "en" ? "data-href-en" : "data-href-pt");
      if (href) link.setAttribute("href", href);
    });
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "pt-BR");
    if (langLabel) langLabel.textContent = lang === "en" ? "ENG" : "PT";
    document.querySelectorAll(".lang-option").forEach(function (opt) {
      opt.classList.toggle("active", opt.getAttribute("data-lang") === lang);
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  function closeLangMenu() {
    if (!langMenu) return;
    langMenu.classList.remove("open");
    langSwitch.setAttribute("aria-expanded", "false");
  }

  if (langSwitch && langMenu) {
    langSwitch.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !langMenu.classList.contains("open");
      langMenu.classList.toggle("open", open);
      langSwitch.setAttribute("aria-expanded", String(open));
    });
    langMenu.addEventListener("click", function (e) {
      var opt = e.target.closest(".lang-option");
      if (!opt) return;
      setLang(opt.getAttribute("data-lang"));
      closeLangMenu();
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".lang-wrap")) closeLangMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLangMenu();
    });
  }

  var savedLang = null;
  try { savedLang = localStorage.getItem("lang"); } catch (e) {}
  if (savedLang === "en") setLang("en");
  else setLang("pt");

  /* ---------- Copiar e-mail para a área de transferência ---------- */
  var emailTile = document.getElementById("email-copy");
  var copiedTimer = null;
  if (emailTile) {
    emailTile.addEventListener("click", function (e) {
      e.preventDefault();
      var email = emailTile.getAttribute("data-email");
      function showFeedback() {
        emailTile.classList.remove("copied");
        void emailTile.offsetWidth; // reinicia a animação em cliques seguidos
        emailTile.classList.add("copied");
        clearTimeout(copiedTimer);
        copiedTimer = setTimeout(function () {
          emailTile.classList.remove("copied");
        }, 2000);
      }
      function legacyCopy() {
        var ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (err) {}
        document.body.removeChild(ta);
        if (ok) showFeedback();
        else window.location.href = "mailto:" + email;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showFeedback, legacyCopy);
      } else {
        legacyCopy();
      }
    });
  }

  /* ---------- Lightbox: amplia as telas dos módulos ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbImg = document.getElementById("lightbox-img");
    var lbClose = document.getElementById("lightbox-close");
    var lbLastFocus = null;
    var lbHideTimer = null;

    function openLightbox(img) {
      clearTimeout(lbHideTimer);
      lbLastFocus = document.activeElement;
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || "";
      lightbox.hidden = false;
      // força o reflow para a transição de entrada rodar
      void lightbox.offsetWidth;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      lbClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      lbHideTimer = setTimeout(function () {
        lightbox.hidden = true;
        lbImg.removeAttribute("src");
      }, 300);
      if (lbLastFocus && lbLastFocus.focus) lbLastFocus.focus();
    }

    document.querySelectorAll(".shot img").forEach(function (img) {
      img.classList.add("is-zoomable");
      img.setAttribute("role", "button");
      img.setAttribute("tabindex", "0");
      img.addEventListener("click", function () { openLightbox(img); });
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(img);
        }
      });
    });

    // clicar no fundo ou no botão fecha; clicar na própria imagem não
    lightbox.addEventListener("click", function (e) {
      if (e.target !== lbImg) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  /* ---------- Tilt sutil nos cards de trabalho ---------- */
  if (!reducedMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".work-media").forEach(function (media) {
      media.addEventListener("mousemove", function (e) {
        var r = media.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        media.style.transform =
          "perspective(900px) rotateY(" + x * 4 + "deg) rotateX(" + -y * 4 + "deg)";
      });
      media.addEventListener("mouseleave", function () {
        media.style.transform = "";
      });
    });
  }
})();
