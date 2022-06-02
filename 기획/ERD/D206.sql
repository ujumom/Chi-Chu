﻿CREATE TABLE `PRODUCT_RATE` (
	`PRODUCT_RATE_PK`	INTEGER	NOT NULL,
	`PRODUCT_CODE2`	VARCHAR2	NOT NULL,
	`AGE`	INTEGER	NULL,
	`GENDER`	VARCHAR2	NULL,
	`PY`	INTEGER	NULL,
	`GY`	INTEGER	NULL,
	`SD`	INTEGER	NULL,
	`RATE`	INTEGER	NULL
);

CREATE TABLE `PRODUCT_OPTION` (
	`OPTION_PK`	INTEGER	NOT NULL,
	`OPTION_CODE`	VARCHAR2	NOT NULL,
	`PRODUCT_CODE`	VARCHAR2	NOT NULL,
	`PRODUCT_OPTION`	VARCHAR2	NULL,
	`COVERAGE`	INTEGER	NULL
);

CREATE TABLE `DB_OPTION` (
	`OPTION_CODE`	VARCHAR2	NOT NULL,
	`OPTION_NAME`	VARCHAR2	NULL,
	`OPTION_GROUP_CODE`	VARCHAR2	NULL,
	`OPTION_GROUP_NAME`	VARCHAR2	NULL
);

CREATE TABLE `COMPANY` (
	`COMPANY_CODE`	VARCHAR2	NOT NULL,
	`COMPANY_NAME`	VARCHAR2	NULL,
	`COMPANY_INDEX`	FLOAT	NULL,
	`NON_PAYMENT_RATE`	FLOAT	NULL,
	`COMPLAINTS`	FLOAT	NULL,
	`PAYMENT_PERIOD`	FLOAT	NULL,
	`DELAY_PERIOD`	FLOAT	NULL,
	`DELAY_RATE`	FLOAT	NULL,
	`CAPITAL_RATIO`	FLOAT	NULL,
	`DEBT_RATIO`	FLOAT	NULL,
	`NET_ASSET`	FLOAT	NULL
);

CREATE TABLE `CONTRACT` (
	`CONTRACT_PK`	INTEGER	NOT NULL,
	`GIS_CD`	VARCHAR2	NULL,
	`CT_PY_AMT`	INTEGER	NULL,
	`CT_PY_CYCLE_CD`	VARCHAR2	NULL,
	`CT_PY_PD`	INTEGER	NULL,
	`CT_CHNL_CD`	VARCHAR2	NULL,
	`INSU_DAY`	INTEGER	NULL,
	`INSU_YEAR`	INTEGER	NULL,
	`MGG_GRP`	VARCHAR2	NULL,
	`MGG_CD`	VARCHAR2	NULL,
	`MGG_CNT`	INTEGER	NULL,
	`MGG_AMT`	INTEGER	NULL
);

CREATE TABLE `PRODUCT` (
	`PRODUCT_CODE`	VARCHAR2	NOT NULL,
	`COMPANY_CODE`	VARCHAR2	NOT NULL,
	`PRODUCT_NAME`	VARCHAR2	NULL,
	`PRODUCT_LINK`	VARCHAR2	NULL,
	`USER_INDEX`	FLOAT	NULL,
	`COMPANY_INDEX`	FLOAT	NULL,
	`PRODUCT_INDEX`	FLOAT	NULL,
	`TOTAL_INDEX`	FLOAT	NULL
);

CREATE TABLE `USER` (
	`USER_CODE`	VARCHAR2	NOT NULL,
	`BTH_YR`	INTEGER	NULL,
	`GENDER`	VARCHAR2	NULL,
	`Field`	INTEGER	NULL
);

CREATE TABLE `PRODUCT_CONTRACT` (
	`PC_PK`	INTEGER	NOT NULL,
	`CONTRACT_PK`	INTEGER	NOT NULL,
	`PRODUCT_CODE`	VARCHAR2	NOT NULL,
	`COMPANY_CODE`	VARCHAR2	NOT NULL
);

CREATE TABLE `USER_CONTRACT` (
	`UC_PK`	INTEGER	NOT NULL,
	`CONTRACT_PK`	INTEGER	NOT NULL,
	`USER_CODE`	VARCHAR2	NOT NULL
);

ALTER TABLE `PRODUCT_RATE` ADD CONSTRAINT `PK_PRODUCT_RATE` PRIMARY KEY (
	`PRODUCT_RATE_PK`,
	`PRODUCT_CODE2`
);

ALTER TABLE `PRODUCT_OPTION` ADD CONSTRAINT `PK_PRODUCT_OPTION` PRIMARY KEY (
	`OPTION_PK`,
	`OPTION_CODE`,
	`PRODUCT_CODE`
);

ALTER TABLE `DB_OPTION` ADD CONSTRAINT `PK_DB_OPTION` PRIMARY KEY (
	`OPTION_CODE`
);

ALTER TABLE `COMPANY` ADD CONSTRAINT `PK_COMPANY` PRIMARY KEY (
	`COMPANY_CODE`
);

ALTER TABLE `CONTRACT` ADD CONSTRAINT `PK_CONTRACT` PRIMARY KEY (
	`CONTRACT_PK`
);

ALTER TABLE `PRODUCT` ADD CONSTRAINT `PK_PRODUCT` PRIMARY KEY (
	`PRODUCT_CODE`,
	`COMPANY_CODE`
);

ALTER TABLE `USER` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`USER_CODE`
);

ALTER TABLE `PRODUCT_CONTRACT` ADD CONSTRAINT `PK_PRODUCT_CONTRACT` PRIMARY KEY (
	`PC_PK`,
	`CONTRACT_PK`,
	`PRODUCT_CODE`,
	`COMPANY_CODE`
);

ALTER TABLE `USER_CONTRACT` ADD CONSTRAINT `PK_USER_CONTRACT` PRIMARY KEY (
	`UC_PK`,
	`CONTRACT_PK`,
	`USER_CODE`
);

ALTER TABLE `PRODUCT_RATE` ADD CONSTRAINT `FK_PRODUCT_TO_PRODUCT_RATE_1` FOREIGN KEY (
	`PRODUCT_CODE2`
)
REFERENCES `PRODUCT` (
	`PRODUCT_CODE`
);

ALTER TABLE `PRODUCT_OPTION` ADD CONSTRAINT `FK_DB_OPTION_TO_PRODUCT_OPTION_1` FOREIGN KEY (
	`OPTION_CODE`
)
REFERENCES `DB_OPTION` (
	`OPTION_CODE`
);

ALTER TABLE `PRODUCT_OPTION` ADD CONSTRAINT `FK_PRODUCT_TO_PRODUCT_OPTION_1` FOREIGN KEY (
	`PRODUCT_CODE`
)
REFERENCES `PRODUCT` (
	`PRODUCT_CODE`
);

ALTER TABLE `PRODUCT` ADD CONSTRAINT `FK_COMPANY_TO_PRODUCT_1` FOREIGN KEY (
	`COMPANY_CODE`
)
REFERENCES `COMPANY` (
	`COMPANY_CODE`
);

ALTER TABLE `PRODUCT_CONTRACT` ADD CONSTRAINT `FK_CONTRACT_TO_PRODUCT_CONTRACT_1` FOREIGN KEY (
	`CONTRACT_PK`
)
REFERENCES `CONTRACT` (
	`CONTRACT_PK`
);

ALTER TABLE `PRODUCT_CONTRACT` ADD CONSTRAINT `FK_PRODUCT_TO_PRODUCT_CONTRACT_1` FOREIGN KEY (
	`PRODUCT_CODE`
)
REFERENCES `PRODUCT` (
	`PRODUCT_CODE`
);

ALTER TABLE `PRODUCT_CONTRACT` ADD CONSTRAINT `FK_PRODUCT_TO_PRODUCT_CONTRACT_2` FOREIGN KEY (
	`COMPANY_CODE`
)
REFERENCES `PRODUCT` (
	`COMPANY_CODE`
);

ALTER TABLE `USER_CONTRACT` ADD CONSTRAINT `FK_CONTRACT_TO_USER_CONTRACT_1` FOREIGN KEY (
	`CONTRACT_PK`
)
REFERENCES `CONTRACT` (
	`CONTRACT_PK`
);

ALTER TABLE `USER_CONTRACT` ADD CONSTRAINT `FK_USER_TO_USER_CONTRACT_1` FOREIGN KEY (
	`USER_CODE`
)
REFERENCES `USER` (
	`USER_CODE`
);

