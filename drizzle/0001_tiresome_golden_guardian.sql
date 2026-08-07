CREATE TABLE `avaliacoes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome_cliente` varchar(100) NOT NULL,
	`nota` int NOT NULL,
	`comentario` text NOT NULL,
	`url_avatar` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `avaliacoes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `materiais_cores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`multiplicador` decimal(5,2) NOT NULL,
	`url_imagem` text NOT NULL,
	`descricao` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `materiais_cores_id` PRIMARY KEY(`id`),
	CONSTRAINT `materiais_cores_nome_unique` UNIQUE(`nome`)
);
--> statement-breakpoint
CREATE TABLE `produtos_base` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tipo` varchar(100) NOT NULL,
	`taxa_base` decimal(10,2) NOT NULL,
	`descricao` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `produtos_base_id` PRIMARY KEY(`id`),
	CONSTRAINT `produtos_base_tipo_unique` UNIQUE(`tipo`)
);
