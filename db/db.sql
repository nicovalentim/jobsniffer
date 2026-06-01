CREATE DATABASE IF NOT EXISTS banco_de_vagas;
USE banco_de_vagas;

--
-- Table structure for table `banco_de_vagas`
--

DROP TABLE IF EXISTS `banco_de_vagas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banco_de_vagas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `requisitos` text DEFAULT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  `localizacao` varchar(100) DEFAULT 'Remoto',
  `regime` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `data_de_criacao` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `banco_de_vagas` WRITE;
INSERT INTO `banco_de_vagas` VALUES (1,'Desenvolvedor Front-End','Criação interfaces responsivas','React, HTML, CSS, JavaScript',7500.00,'Remoto','Meio período','TI','2026-03-17 19:42:32'),(2,'Analista de Suporte Técnico','Atendimento a usuários e manutenção','Windows, Redes, Hardware',3500.00,'Híbrido','Período integral','TI','2026-03-17 19:42:32'),(3,'Administrador de Banco de Dados (DBA)','Gestão e otimização de bancos MySQL','SQL Avançado, Backup, Performance',9000.00,'Remoto','Período integral','TI','2026-03-17 19:42:32'),(4,'Engenheiro de Redes','Configuração de roteadores e firewalls','Certificação CCNA, Protocolos TCP/IP',8200.00,'Presencial','Período integral','TI','2026-03-17 19:42:32'),(5,'Analista de Segurança da Informação','Monitoramento de ameaças e vulnerabilidades','LGPD, Firewall, Ethical Hacking',9500.00,'Remoto','Meio período','TI','2026-03-17 19:42:32'),(6,'Consultor de Sucesso do Cliente (Vendedor)','Prospecção ativa de novos negócios., Diagnóstico de necessidades e apresentação de soluções., Negociação e fechamento de contratos., Gestão de contatos no sistema (CRM)','Pacote Office, Organização',2800.00,'Presencial','Período integral','COM','2026-03-17 19:42:32'),(7,'Recepcionista','Atendimento telefônico e recepção de clientes','Comunicação assertiva, Inglês básico',2200.00,'Presencial','Período integral','ADM','2026-03-17 19:42:32'),(8,'Auxiliar Financeiro','Controle de contas a pagar e receber','Matemática financeira, Excel',3000.00,'Híbrido','Meio período','ADM','2026-03-17 19:42:32'),(9,'Analista Administrativo','Gestão de processos internos e relatórios','Gestão de processos, ERP',2500.00,'Presencial','Meio período','ADM','2026-03-17 19:42:32'),(10,'Analista de Marketing','Gestão de Campanhas: Criar e monitorar anúncios em redes sociais e Google Ads., Conteúdo: Produzir materiais para blog, e-mail marketing e redes sociais., Análise de Dados: Mensurar KPIs e o ROI das ações de marketing., Branding: Garantir a consistência da identidade visual e voz da marca','Criatividade: Capacidade de propor soluções fora da caixa., Analítico: Domínio de ferramentas como Google Analytics e RD Station/HubSpot.\r, Comunicação: Redação impecável e excelente habilidade interpessoal.',3200.00,'Híbrido','Meio período','MKT','2026-03-17 19:42:32'),(11,'Analista de Logística','Gestão de Estoque: Controlar entradas e saídas, evitando rupturas ou excessos., Fretes e Transportes: Negociar com transportadoras e roteirizar entregas., Recebimento e Expedição: Supervisionar a conferência física e documental (notas fiscais)., Indicadores (KPIs): Monitorar prazos de entrega (OTIF) e custos operacionais.','Raciocínio Lógico: Facilidade com números e resolução de problemas., Agilidade: Capacidade de tomar decisões rápidas sob pressão., Domínio de Ferramentas: Experiência com sistemas ERP e Excel avançado.',3100.00,'Presencial','Meio período','LOG','2026-03-17 19:42:32'),(12,'Projetista Mecânico (Equipamentos de Impressão)','Modelagem 3D e 2D: Elaborar projetos detalhados de peças e conjuntos., Especificação: Definir materiais e processos de fabricação (usinagem, montagem)., Melhoria Contínua: Otimizar mecanismos para ganho de performance., Documentação: Criar listas de materiais e manuais técnicos.','Domínio de SolidWorks, AutoCAD ou similar., Conhecimento em normas técnicas e mecânica de precisão.\r, Raciocínio lógico e atenção aos detalhes.',8000.00,'Hibrido','Meio período','ENG','2026-03-17 19:42:32');
UNLOCK TABLES;

--
-- Table structure for table `cadastro`
--

DROP TABLE IF EXISTS `cadastro`;
CREATE TABLE `cadastro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(10) DEFAULT "usuario",
  `Nome` varchar(150) DEFAULT NULL,
  `Email` varchar(150) DEFAULT NULL UNIQUE,
  `Senha` varchar(16) DEFAULT NULL,
  `Nascimento` varchar(10) DEFAULT NULL,
  `Telefone` varchar(15) DEFAULT NULL,
  `CEP` varchar(8) DEFAULT NULL,
  `LinkedIn_url` varchar(255) DEFAULT NULL,
  `Folio_url` varchar(255) DEFAULT NULL,
  `Curriculo` int(11) DEFAULT NULL,
  `Vagas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `cadastro` WRITE;
INSERT into `cadastro` VALUES (0,'admin','Administrador','admin@jobsniffer.com','scrypt:32768:8:1$QRtIXu39TIEewPk9$668eb2c6b5034c20815f946c99ded2520b05d596af2d04084e10e723f78961dfc2b39381aa6bf3d1181d87b27dcdbe14e5148c57040488785ce176641c1101b3',NULL,NULL,NULL,NULL,NULL,NULL,NULL), (1,'usuario','Usuário de Testes','usuario@dominio.com','scrypt:32768:8:1$07JFRaZQAEyVwLbJ$67c18b3167e02607ebe21eeb7f71b92fa901bed4dbb5185f5197c3d6f153e405641344e426c6271462e9707556f442e6b1fef6a12b6ccd703fddb40506964740','12 / 03 / 2045','(11) 98765-4321','12345-678',NULL,NULL,NULL,NULL);
/* senha é Admin1 */
UNLOCK TABLES;

DROP TABLE IF EXISTS `candidaturas`;
CREATE TABLE `candidaturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `vaga_id` int(11) NOT NULL,
  `data_candidatura` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `cadastro`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`vaga_id`) REFERENCES `banco_de_vagas`(`id`) ON DELETE CASCADE,
  UNIQUE (`usuario_id`, `vaga_id`)
);