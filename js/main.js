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
    "em breve": "coming soon",

    // ===== Case Financiamento Estudantil (PLP + PDP) =====
    "PLATAFORMA WEB · PRAVALER": "WEB PLATFORM · PRAVALER",
    "Uma jornada de escolha única": "A single-choice journey",
    "Recriei a PLP e a PDP da Pravaler para o usuário chegar à proposta com a escolha que já havia feito, sem repetir etapas entre squads. O abandono pela causa principal caiu de 13% para 4%.": "I rebuilt Pravaler's PLP and PDP so the user could reach the proposal with the choice already made, without repeating steps across squads. Abandonment from the main cause dropped from 13% to 4%.",
    "Product Designer Especialista": "Specialist Product Designer",
    "Squad de descoberta": "Discovery squad",
    "Jornada de descoberta": "Discovery journey",

    // O Desafio
    "O usuário escolhia o curso, começava a contratação e tinha que escolher tudo de novo.": "The user chose the course, started the application, and had to choose everything again.",
    "A Pravaler é uma fintech de financiamento estudantil, crédito para o aluno pagar a faculdade. A descoberta de cursos vivia numa página legado: lenta, com problemas de acessibilidade e de heurística, e sem comunicar a proposta de valor da marca para quem chegava. E quem chega ali é um público valioso, tráfego incremental e qualificado, que converte bem, mas que na maioria ainda não conhece a marca.": "Pravaler is a student financing fintech, credit for students to pay for college. Course discovery lived on a legacy page: slow, with accessibility and heuristic issues, and without communicating the brand's value proposition to newcomers. And whoever arrives there is a valuable audience, incremental and qualified traffic that converts well but mostly still doesn't know the brand.",
    "O problema real não era ter passos demais. A decisão de financiar estava quebrada entre duas squads: o usuário escolhia curso e SKU na descoberta e, ao entrar no fluxo de contratação, precisava escolher de novo. A repetição gerava insegurança num processo longo, e ele desistia antes de ver a proposta.": "The real problem wasn't having too many steps. The decision to finance was broken across two squads: the user chose course and SKU during discovery and, when entering the application flow, had to choose again. The repetition created insecurity in a long process, and the user gave up before seeing the proposal.",
    "A dificuldade de compreender o financiamento amplificava tudo, respondia por 13% do abandono e tirava a motivação justo onde o esforço era maior. Entrei como único designer do projeto, atuando de ponta a ponta, da descoberta à validação.": "The difficulty in understanding the financing amplified everything, it accounted for 13% of abandonment and drained motivation exactly where effort was highest. I joined as the project's sole designer, working end to end, from discovery to validation.",

    // A Descoberta
    "A DESCOBERTA": "DISCOVERY",
    "Dois instrumentos independentes, uma mesma dor.": "Two independent instruments, the same pain.",
    "Cruzei duas fontes que não conversam entre si: pesquisas de abandono (dropout no Hotjar) e tickets de atendimento do CS. Quando as duas apontam para o mesmo lugar, a chance de estar perseguindo um problema real, e não uma percepção, sobe muito. Sintetizei tudo numa matriz CSD (Certezas, Suposições, Dúvidas), construída com PM, tech e marketing, para separar dado de achismo antes de propor qualquer solução.": "I cross-referenced two sources that don't talk to each other: abandonment research (dropout in Hotjar) and CS support tickets. When both point to the same place, the odds of chasing a real problem, and not a perception, go way up. I synthesized everything in a CSD matrix (Certainties, Assumptions, Doubts), built with PM, tech and marketing, to separate data from guesswork before proposing any solution.",
    "Compreender o financiamento era a maior dificuldade": "Understanding the financing was the biggest difficulty",
    "O usuário não entendia o que estava contratando nem o benefício. Sozinha, essa dor respondia por 13% do abandono.": "The user didn't understand what they were signing up for or the benefit. On its own, this pain accounted for 13% of abandonment.",
    "O valor aparecia tarde demais": "The value showed up too late",
    "Os valores só ficavam claros na simulação da proposta, e apenas cerca de 8% dos visitantes chegavam até lá. A maioria desistia antes de ver o que a convenceria.": "Prices only became clear in the proposal simulation, and only about 8% of visitors got there. Most gave up before seeing what would convince them.",
    "A escolha era feita duas vezes": "The choice was made twice",
    "Havia dois caminhos para escolher curso e SKU na descoberta e, ao entrar no fluxo de contratação de outra squad, o usuário refazia tudo. Repetição virava insegurança, e insegurança virava desistência.": "There were two paths to choose course and SKU during discovery and, when entering another squad's application flow, the user redid everything. Repetition turned into insecurity, and insecurity turned into drop-off.",
    "Síntese da descoberta em Certezas, Suposições e Dúvidas": "Discovery synthesized into Certainties, Assumptions and Doubts",
    "Matriz CSD construída com a squad": "CSD matrix built with the squad",

    // Estratégia e Priorização
    "ESTRATÉGIA E PRIORIZAÇÃO": "STRATEGY & PRIORITIZATION",
    "Decidi os caminhos antes de desenhar as telas.": "I decided the paths before designing the screens.",
    "Liguei o resultado que eu queria mover, reduzir o abandono até a proposta, às oportunidades e às soluções candidatas. Assim eu discutia caminhos, não pixels.": "I connected the outcome I wanted to move, reducing abandonment on the way to the proposal, to the opportunities and candidate solutions. That way I discussed paths, not pixels.",
    "Benchmark facilitado por mim": "Benchmark facilitated by me",
    "Conduzi uma dinâmica com a squad e stakeholders sobre quatro referências, dois concorrentes diretos e dois players de fora do setor. O grupo votava o que usar e o que descartar. Saí com o escopo do protótipo mapeado e a squad comprada na decisão.": "I ran a session with the squad and stakeholders on four references, two direct competitors and two players from outside the sector. The group voted on what to use and what to drop. I left with the prototype scope mapped and the squad bought into the decision.",
    "Esforço x impacto e parking lot": "Effort vs impact and parking lot",
    "Medi esforço contra impacto junto com tech e cortei o que não fazia sentido na primeira entrega. Nada foi jogado fora: o descartado foi para um parking lot, o que deu previsibilidade de escopo.": "I measured effort against impact together with tech and cut what didn't make sense for the first release. Nothing was thrown away: what was dropped went to a parking lot, which gave scope predictability.",
    "Métricas definidas antes de desenhar": "Metrics defined before designing",
    "Fechei como mediria sucesso antes da primeira tela: o abandono como estrela-guia e um teste A/B controlado como prova. Isso evita comemorar qualquer número no fim.": "I set how I'd measure success before the first screen: abandonment as the north star and a controlled A/B test as proof. That avoids celebrating any number at the end.",
    "Das dores às apostas priorizadas": "From pains to prioritized bets",
    "Opportunity Solution Tree e matriz de esforço x impacto": "Opportunity Solution Tree and effort vs impact matrix",
    "Opportunity Solution Tree: do resultado às soluções candidatas": "Opportunity Solution Tree: from outcome to candidate solutions",
    "Benchmark de funcionalidades avaliado com a squad": "Feature benchmark assessed with the squad",
    "Priorização por esforço e impacto, com parking lot": "Prioritization by effort and impact, with a parking lot",

    // A Solução
    "Uma escolha, carregada até a proposta.": "One choice, carried all the way to the proposal.",
    "As decisões da descoberta viraram três movimentos.": "The discovery decisions became three moves.",
    "A escolha uma vez só": "The choice, only once",
    "Recriei a PLP, que antes não tinha cara de página de listagem, e a PDP para que a escolha de curso e SKU fosse feita uma única vez e viajasse com o usuário para dentro do fluxo de contratação. Ele deixa de reescolher e entra na contratação com o curso já definido.": "I rebuilt the PLP, which didn't look like a listing page before, and the PDP so the course and SKU choice was made only once and traveled with the user into the application flow. They stop rechoosing and enter the application with the course already set.",
    "Valor antecipado": "Value brought forward",
    "Em vez de esconder o essencial até a simulação, trouxe a proposta de valor do financiamento e as informações de decisão, modalidade, turno, grade curricular, empregabilidade e selo oficial de avaliação, para a primeira dobra e ao longo da rolagem, com CTA presente em vários pontos. Dar motivo para seguir antes de pedir esforço.": "Instead of hiding the essentials until the simulation, I brought the financing value proposition and the decision information, format, shift, curriculum, employability and official rating seal, to the first fold and along the scroll, with a CTA present at several points. Give a reason to continue before asking for effort.",
    "Compliance na exibição de valores": "Compliance in showing prices",
    "03 · Compliance na exibição de valores": "03 · Compliance in showing prices",
    "Precisão de informação financeira não se negocia. Compliance acima de conversão.": "Accuracy of financial information is non-negotiable. Compliance above conversion.",
    "Onde havia divergência entre o valor da instituição e o do produto, mostrar um número impreciso era risco de compliance. Optei por não exibir nesses casos e conduzir o usuário à simulação para o número correto.": "Where the institution's price and the product's price diverged, showing an inaccurate number was a compliance risk. I chose not to display it in those cases and to lead the user to the simulation for the correct number.",
    "Onde havia divergência entre o valor da instituição e o do produto, mostrar um número impreciso era risco de compliance. Optei por não exibir nesses casos e conduzir o usuário à simulação para o número correto. Precisão de informação financeira não se negocia, compliance acima de conversão.": "Where the institution's price and the product's price diverged, showing an inaccurate number was a compliance risk. I chose not to display it in those cases and to lead the user to the simulation for the correct number. Accuracy of financial information is non-negotiable, compliance above conversion.",
    "Do conceito ao protótipo": "From concept to prototype",
    "Levei a estrutura direto ao protótipo, já alinhada com copy, SEO e growth e validada com tech antes de subir a fidelidade, reaproveitando componentes que já funcionavam em outras páginas. Menos ida e volta, viabilidade garantida cedo, e o pixel a serviço da decisão de arquitetura.": "I took the structure straight to the prototype, already aligned with copy, SEO and growth and validated with tech before raising fidelity, reusing components that already worked on other pages. Less back and forth, viability ensured early, and the pixel serving the architecture decision.",
    "PLP e PDP com a escolha única": "PLP and PDP with the single choice",
    "Proposta de valor na primeira dobra": "Value proposition in the first fold",
    "Exibição de valores sob compliance": "Showing prices under compliance",

    // Validação
    "VALIDAÇÃO": "VALIDATION",
    "Testei antes de comemorar.": "I tested before celebrating.",
    "Teste A/B controlado no Amplitude": "Controlled A/B test in Amplitude",
    "Comparei a página nova contra a antiga nos dois cursos mais procurados na base, para concentrar o teste onde havia mais demanda e ler o resultado em dez dias. Métrica primária, conversão de visitante em lead: a variante venceu nos dois, com 32% e 29% de aumento.": "I compared the new page against the old one on the two most searched courses in the base, to focus the test where demand was highest and read the result in ten days. Primary metric, visitor-to-lead conversion: the variant won on both, with 32% and 29% gains.",
    "O que eu deliberadamente não testei": "What I deliberately didn't test",
    "Deixei a versão com valores de fora do A/B. A página já carregava mudanças demais e incluir os valores contaminaria a leitura. Isolar a variável é o que separa um teste de uma torcida.": "I left the version with prices out of the A/B. The page already carried too many changes and including prices would contaminate the reading. Isolating the variable is what separates a test from wishful thinking.",
    "Shadowing digital no Clarity": "Digital shadowing in Clarity",
    "Analisei gravações de tela e mapas de calor para achar fricções finas, como o checklist difícil no mobile e a posição das perguntas frequentes. Nada virou correção às pressas: transformei em um backlog priorizado de melhoria contínua.": "I analyzed session recordings and heatmaps to find fine frictions, like the checklist being hard on mobile and the position of the FAQ. Nothing became a rushed fix: I turned it into a prioritized backlog of continuous improvement.",

    // Resultados
    "Menos desistência, valor mais cedo.": "Less drop-off, value sooner.",
    "13% → 4% de abandono": "13% → 4% abandonment",
    "A causa principal do abandono, medida por dropout no Hotjar e tickets de CS, três meses após o lançamento e com a mesma base.": "The main cause of abandonment, measured by dropout in Hotjar and CS tickets, three months after launch and on the same base.",
    "+32% e +29% de conversão": "+32% and +29% conversion",
    "Conversão de visitante em lead no teste A/B controlado, ante a versão antiga, confirmando a direção no campo.": "Visitor-to-lead conversion in the controlled A/B test, against the old version, confirming the direction in the field.",
    "~7,3 mil páginas no ar": "~7.3k pages live",
    "Publicadas em duas ondas com tech. O style guide e os componentes que criei cortaram um dia na produção de cada nova página.": "Published in two waves with tech. The style guide and components I created cut one day from producing each new page.",

    // As Páginas
    "AS PÁGINAS": "THE PAGES",
    "PLP e PDP no ar.": "PLP and PDP live.",
    "PLP completa": "Full PLP",
    "Página de listagem recriada": "Listing page rebuilt",
    "PDP completa": "Full PDP",
    "Página de detalhe recriada": "Detail page rebuilt",

    // Aprendizados
    "APRENDIZADOS": "LEARNINGS",
    "O que eu levo para qualquer próximo projeto.": "What I take to any next project.",
    "Sistema vence tela": "System beats screen",
    "O style guide e os componentes não entregaram só a PLP e a PDP, baratearam todas as páginas seguintes. Pensar em sistema é o que escala design.": "The style guide and components didn't just deliver the PLP and the PDP, they made every following page cheaper. Thinking in systems is what scales design.",
    "Clareza é conversão": "Clarity is conversion",
    "O maior ganho não veio de um truque, e sim de explicar bem o produto, a ponto de o usuário permanecer mesmo sem simular. Conteúdo e proposta de valor são trabalho de design.": "The biggest gain didn't come from a trick, but from explaining the product well, to the point the user stayed even without simulating. Content and value proposition are design work.",
    "O resultado mora na interseção": "The result lives at the intersection",
    "O abandono só caiu porque negócio, UX e tech decidiram juntos. Como único designer, meu papel foi costurar SEO, copy, arquitetura e tecnologia, não apenas desenhar telas.": "Abandonment only dropped because business, UX and tech decided together. As the sole designer, my role was to stitch SEO, copy, architecture and technology, not just design screens.",

    // Placeholders
    "Telas finais da PLP e da PDP": "Final PLP and PDP screens",
    "imagem em breve": "image coming soon",
    "tela em breve": "screen coming soon",

    // Card na home
    "Uma jornada de escolha única para uma fintech de financiamento estudantil": "A single-choice journey for a student financing fintech",
    "PLP e PDP que levam o usuário à contratação com o curso já escolhido, sem refazer etapas entre squads, e reduziram o abandono pela causa principal de 13% para 4%.": "A PLP and a PDP that take the user into the application with the course already chosen, without redoing steps across squads, cutting abandonment from the main cause from 13% to 4%."
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
