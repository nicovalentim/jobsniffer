CREATE DATABASE IF NOT EXISTS banco_de_vagas;
USE banco_de_vagas;

-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: banco_de_vagas
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-31  4:06:00
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: login
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banco_de_curriculos`
--

DROP TABLE IF EXISTS `banco_de_curriculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banco_de_curriculos` (
  `nome_documento` varchar(150) DEFAULT NULL,
  `caminho_no_servidor` varchar(255) DEFAULT NULL,
  `vaga` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banco_de_curriculos`
--

LOCK TABLES `banco_de_curriculos` WRITE;
/*!40000 ALTER TABLE `banco_de_curriculos` DISABLE KEYS */;
/*!40000 ALTER TABLE `banco_de_curriculos` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banco_de_vagas`
--

LOCK TABLES `banco_de_vagas` WRITE;
/*!40000 ALTER TABLE `banco_de_vagas` DISABLE KEYS */;
INSERT INTO `banco_de_vagas` VALUES (1,'Desenvolvedor Front-End','Criação interfaces responsivas','React, HTML, CSS, JavaScript',7500.00,'Remoto','Meio período','TI','2026-03-17 19:42:32'),(2,'Analista de Suporte Técnico','Atendimento a usuários e manutenção','Windows, Redes, Hardware',3500.00,'Híbrido','Período integral','TI','2026-03-17 19:42:32'),(3,'Administrador de Banco de Dados (DBA)','Gestão e otimização de bancos MySQL','SQL Avançado, Backup, Performance',9000.00,'Remoto','Período integral','TI','2026-03-17 19:42:32'),(4,'Engenheiro de Redes','Configuração de roteadores e firewalls','Certificação CCNA, Protocolos TCP/IP',8200.00,'Presencial','Período integral','TI','2026-03-17 19:42:32'),(5,'Analista de Segurança da Informação','Monitoramento de ameaças e vulnerabilidades','LGPD, Firewall, Ethical Hacking',9500.00,'Remoto','Meio período','TI','2026-03-17 19:42:32'),(6,'Consultor de Sucesso do Cliente (Vendedor)','Prospecção ativa de novos negócios., Diagnóstico de necessidades e apresentação de soluções., Negociação e fechamento de contratos., Gestão de contatos no sistema (CRM)','Pacote Office, Organização',2800.00,'Presencial','Período integral','COM','2026-03-17 19:42:32'),(7,'Recepcionista','Atendimento telefônico e recepção de clientes','Comunicação assertiva, Inglês básico',2200.00,'Presencial','Período integral','ADM','2026-03-17 19:42:32'),(8,'Auxiliar Financeiro','Controle de contas a pagar e receber','Matemática financeira, Excel',3000.00,'Híbrido','Meio período','ADM','2026-03-17 19:42:32'),(9,'Analista Administrativo','Gestão de processos internos e relatórios','Gestão de processos, ERP',2500.00,'Presencial','Meio período','ADM','2026-03-17 19:42:32'),(10,'Analista de Marketing','Gestão de Campanhas: Criar e monitorar anúncios em redes sociais e Google Ads., Conteúdo: Produzir materiais para blog, e-mail marketing e redes sociais., Análise de Dados: Mensurar KPIs e o ROI das ações de marketing., Branding: Garantir a consistência da identidade visual e voz da marca','Criatividade: Capacidade de propor soluções fora da caixa., Analítico: Domínio de ferramentas como Google Analytics e RD Station/HubSpot.\r, Comunicação: Redação impecável e excelente habilidade interpessoal.',3200.00,'Híbrido','Meio período','MKT','2026-03-17 19:42:32'),(11,'Analista de Logística','Gestão de Estoque: Controlar entradas e saídas, evitando rupturas ou excessos., Fretes e Transportes: Negociar com transportadoras e roteirizar entregas., Recebimento e Expedição: Supervisionar a conferência física e documental (notas fiscais)., Indicadores (KPIs): Monitorar prazos de entrega (OTIF) e custos operacionais.','Raciocínio Lógico: Facilidade com números e resolução de problemas., Agilidade: Capacidade de tomar decisões rápidas sob pressão., Domínio de Ferramentas: Experiência com sistemas ERP e Excel avançado.',3100.00,'Presencial','Meio período','LOG','2026-03-17 19:42:32'),(12,'Projetista Mecânico (Equipamentos de Impressão)','Modelagem 3D e 2D: Elaborar projetos detalhados de peças e conjuntos., Especificação: Definir materiais e processos de fabricação (usinagem, montagem)., Melhoria Contínua: Otimizar mecanismos para ganho de performance., Documentação: Criar listas de materiais e manuais técnicos.','Domínio de SolidWorks, AutoCAD ou similar., Conhecimento em normas técnicas e mecânica de precisão.\r, Raciocínio lógico e atenção aos detalhes.',8000.00,'Hibrido','Meio período','ENG','2026-03-17 19:42:32');
/*!40000 ALTER TABLE `banco_de_vagas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cadastro`
--

DROP TABLE IF EXISTS `cadastro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cadastro` (
  `Nome` varchar(150) DEFAULT NULL,
  `Data_Nascimento` date DEFAULT NULL,
  `cidade` varchar(50) DEFAULT NULL,
  `estado` char(2) DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadastro`
--

LOCK TABLES `cadastro` WRITE;
/*!40000 ALTER TABLE `cadastro` DISABLE KEYS */;
/*!40000 ALTER TABLE `cadastro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `email` varchar(150) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('ana.silva@email.com','Ana#2024!'),('marcos.dev@techmail.io','SenhaSegura123'),('carla.projetos@empresa.com.br','Admin@321'),('lucas.oliveira@webmail.pt','P@ssword_99'),('fernanda.mkt@agencia.com','Mudar#Agosto');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-31  4:06:00

