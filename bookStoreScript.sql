USE [master]
GO
/****** Object:  Database [BookStore]    Script Date: 14/8/2024 3:56:42 p. m. ******/
CREATE DATABASE [BookStore]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BookStore', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.PCSERVER\MSSQL\DATA\BookStore.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BookStore_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.PCSERVER\MSSQL\DATA\BookStore_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [BookStore] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BookStore].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BookStore] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BookStore] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BookStore] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BookStore] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BookStore] SET ARITHABORT OFF 
GO
ALTER DATABASE [BookStore] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BookStore] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BookStore] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BookStore] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BookStore] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BookStore] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BookStore] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BookStore] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BookStore] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BookStore] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BookStore] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BookStore] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BookStore] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BookStore] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BookStore] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BookStore] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BookStore] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BookStore] SET RECOVERY FULL 
GO
ALTER DATABASE [BookStore] SET  MULTI_USER 
GO
ALTER DATABASE [BookStore] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BookStore] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BookStore] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BookStore] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BookStore] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BookStore] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'BookStore', N'ON'
GO
ALTER DATABASE [BookStore] SET QUERY_STORE = OFF
GO
USE [BookStore]
GO
/****** Object:  Table [dbo].[Books]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Books](
	[BookID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](100) NOT NULL,
	[YearWritten] [int] NOT NULL,
	[Author] [varchar](100) NOT NULL,
	[Publisher] [varchar](100) NULL,
	[PublishedDate] [datetime] NOT NULL,
	[Price] [decimal](10, 2) NOT NULL,
	[Create_dt] [datetime] NOT NULL,
	[Update_dt] [datetime] NOT NULL,
	[StatusID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[BookID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[ClientID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[FullName]  AS (([FirstName]+' ')+[LastName]) PERSISTED NOT NULL,
	[IdentificationNumber] [varchar](20) NOT NULL,
	[Phone] [varchar](20) NOT NULL,
	[Address] [varchar](100) NOT NULL,
	[Create_dt] [datetime] NOT NULL,
	[Update_dt] [datetime] NOT NULL,
	[StatusID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[IdentificationNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SaleDetails]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SaleDetails](
	[SaleDetailID] [int] IDENTITY(1,1) NOT NULL,
	[SaleID] [int] NOT NULL,
	[BookID] [int] NOT NULL,
	[SalePrice] [decimal](10, 2) NOT NULL,
	[Create_dt] [datetime] NOT NULL,
	[Update_dt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[SaleDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sales]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sales](
	[SaleID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NOT NULL,
	[StatusID] [int] NOT NULL,
	[SaleDate] [datetime] NULL,
	[Create_dt] [datetime] NOT NULL,
	[Update_dt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[SaleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Status]    Script Date: 14/8/2024 3:57:47 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Status](
	[StatusID] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [varchar](50) NOT NULL,
	[Create_dt] [datetime] NULL,
	[Update_dt] [datetime] NULL,
	[StatusCode] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[StatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Status] ON 
GO
INSERT [dbo].[Status] ([StatusID], [StatusName], [Create_dt], [Update_dt], [StatusCode]) VALUES (1, N'Activo', CAST(N'2024-08-12T18:24:01.140' AS DateTime), CAST(N'2024-08-12T18:24:01.140' AS DateTime), N'Active')
GO
INSERT [dbo].[Status] ([StatusID], [StatusName], [Create_dt], [Update_dt], [StatusCode]) VALUES (2, N'Eliminado', CAST(N'2024-08-12T18:24:01.143' AS DateTime), CAST(N'2024-08-12T18:24:01.143' AS DateTime), N'Deleted')
GO
INSERT [dbo].[Status] ([StatusID], [StatusName], [Create_dt], [Update_dt], [StatusCode]) VALUES (3, N'Procesando', CAST(N'2024-08-12T18:24:01.143' AS DateTime), CAST(N'2024-08-12T18:24:01.143' AS DateTime), N'Processing')
GO
INSERT [dbo].[Status] ([StatusID], [StatusName], [Create_dt], [Update_dt], [StatusCode]) VALUES (4, N'Pendiente', CAST(N'2024-08-12T18:24:01.143' AS DateTime), CAST(N'2024-08-12T18:24:01.143' AS DateTime), N'Pending')
GO
INSERT [dbo].[Status] ([StatusID], [StatusName], [Create_dt], [Update_dt], [StatusCode]) VALUES (5, N'Completado', CAST(N'2024-08-12T18:24:01.143' AS DateTime), CAST(N'2024-08-12T18:24:01.143' AS DateTime), N'Completed')
GO
INSERT [dbo].[Status] ([StatusID], [StatusName], [Create_dt], [Update_dt], [StatusCode]) VALUES (6, N'Cancelado', CAST(N'2024-08-12T18:24:01.143' AS DateTime), CAST(N'2024-08-12T18:24:01.143' AS DateTime), N'Cancelled')
GO
SET IDENTITY_INSERT [dbo].[Status] OFF
GO
ALTER TABLE [dbo].[Books] ADD  DEFAULT (getdate()) FOR [Create_dt]
GO
ALTER TABLE [dbo].[Books] ADD  DEFAULT (getdate()) FOR [Update_dt]
GO
ALTER TABLE [dbo].[Clients] ADD  DEFAULT (getdate()) FOR [Create_dt]
GO
ALTER TABLE [dbo].[Clients] ADD  DEFAULT (getdate()) FOR [Update_dt]
GO
ALTER TABLE [dbo].[SaleDetails] ADD  DEFAULT (getdate()) FOR [Create_dt]
GO
ALTER TABLE [dbo].[SaleDetails] ADD  DEFAULT (getdate()) FOR [Update_dt]
GO
ALTER TABLE [dbo].[Sales] ADD  DEFAULT (getdate()) FOR [Create_dt]
GO
ALTER TABLE [dbo].[Sales] ADD  DEFAULT (getdate()) FOR [Update_dt]
GO
ALTER TABLE [dbo].[Books]  WITH CHECK ADD FOREIGN KEY([StatusID])
REFERENCES [dbo].[Status] ([StatusID])
GO
ALTER TABLE [dbo].[Clients]  WITH CHECK ADD FOREIGN KEY([StatusID])
REFERENCES [dbo].[Status] ([StatusID])
GO
ALTER TABLE [dbo].[SaleDetails]  WITH CHECK ADD FOREIGN KEY([BookID])
REFERENCES [dbo].[Books] ([BookID])
GO
ALTER TABLE [dbo].[SaleDetails]  WITH CHECK ADD FOREIGN KEY([SaleID])
REFERENCES [dbo].[Sales] ([SaleID])
GO
ALTER TABLE [dbo].[Sales]  WITH CHECK ADD FOREIGN KEY([ClientID])
REFERENCES [dbo].[Clients] ([ClientID])
GO
ALTER TABLE [dbo].[Sales]  WITH CHECK ADD FOREIGN KEY([StatusID])
REFERENCES [dbo].[Status] ([StatusID])
GO
/****** Object:  StoredProcedure [dbo].[GetBookByID]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetBookByID]
	@BookID int
as
begin

	select 
		BookID,
		Title,
		YearWritten,
		Author,
		Publisher,
		PublishedDate,
		Price,
		B.Create_dt,
		B.Update_dt,
		S.StatusCode
	from Books B
	inner join Status S on B.StatusID = S.StatusID
	where BookID = @BookID

end
GO
/****** Object:  StoredProcedure [dbo].[GetBooks]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetBooks]

as
begin

	declare @statusID  int = 
	(
		select top 1
				StatusID
		from Status 
		where StatusCode = 'Active'
	)

	select 
		BookID,
		Title,
		YearWritten,
		Author,
		Publisher,
		FORMAT(PublishedDate, 'yyyy-MM-dd') AS PublishedDate,
		Price,
		B.Create_dt,
		B.Update_dt,
		S.StatusCode
	from Books B
	inner join Status S on B.StatusID = S.StatusID
	where B.StatusID = @statusID

end
GO
/****** Object:  StoredProcedure [dbo].[GetClientById]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetClientById]
	@ClientID int
as
begin

	select
		ClientID,
		FirstName,
		LastName,
		FullName,
		IdentificationNumber,
		Phone,
		Address,
		C.Create_dt,
		C.Update_dt,
		S.StatusCode
	  from dbo.Clients C
	  inner join Status S on C.StatusID = S.StatusID
	  where
		ClientID = @ClientID

end
GO
/****** Object:  StoredProcedure [dbo].[GetClients]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetClients]

as
begin
	declare @statusID  int = 
	(
		select top 1
				StatusID
		from Status 
		where StatusCode = 'Active'
	)

	select
		ClientID,
		FirstName,
		LastName,
		FullName,
		IdentificationNumber,
		Phone,
		Address,
		C.Create_dt,
		C.Update_dt,
		S.StatusCode
	  from dbo.Clients C
	  inner join Status S on C.StatusID = S.StatusID
	  where
		C.StatusID = @statusID

end
GO
/****** Object:  StoredProcedure [dbo].[GetSaleById]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetSaleById]
	@SaleID int
as
begin
	declare @statusID  int = 
	(
		select top 1
				StatusID
		from Status 
		where StatusCode = 'Completed'
	)

	select
		SA.SaleID,
		SA.ClientID,
		C.FullName as ClientName,
		S.StatusCode,
		SA.SaleDate,
		SA.Create_dt,
		SA.Update_dt,
		ISNULL(SD.CountBook, 0) AS CountBook,
		ISNULL(SD.Total, 0) AS Total
	from dbo.Sales SA 
	inner join dbo.Status S on S.StatusID = SA.StatusID
	inner join dbo.Clients C on SA.ClientID = C. ClientID
	left join 
	(
		select 
			SaleID,
			COUNT(SaleID) as CountBook,
			SUM(SalePrice) as Total
		from SaleDetails
		group by 
			SaleID
	) SD on SA.SaleID = SD.SaleID
	WHERE 
		SA.StatusID = @statusID and SA.SaleID = @SaleID

end
GO
/****** Object:  StoredProcedure [dbo].[GetSaleDetailById]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[GetSaleDetailById]
	@SaleDetailID int
as
begin

	select 
		SaleDetailID,
		SaleID,
		BookID,
		SalePrice,
		Create_dt,
		Update_dt
	from dbo.SaleDetails
	where 
		SaleDetailID = @SaleDetailID

end
GO
/****** Object:  StoredProcedure [dbo].[GetSaleDetails]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetSaleDetails]
	@SaleID int
as
begin

	select 
		SaleDetailID,
		SaleID,
		B.BookID,
		B.Title as BookName,
		B.Author,
		SalePrice,
		SD.Create_dt,
		SD.Update_dt
	from dbo.SaleDetails SD
	inner join Books B on SD.BookID = B.BookID
	where 
		SaleID = @SaleID

end
GO
/****** Object:  StoredProcedure [dbo].[GetSales]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetSales]

as
begin
	declare @statusID  int = 
	(
		select top 1
				StatusID
		from Status 
		where StatusCode = 'Completed'
	)

	select
		SA.SaleID,
		SA.ClientID,
		C.FullName as ClientName,
		S.StatusCode,
		SA.SaleDate,
		SA.Create_dt,
		SA.Update_dt,
		ISNULL(SD.CountBook, 0) AS CountBook,
		ISNULL(SD.Total, 0) AS Total
	from dbo.Sales SA 
	inner join dbo.Status S on S.StatusID = SA.StatusID
	inner join dbo.Clients C on SA.ClientID = C. ClientID
	left join 
	(
		select 
			SaleID,
			COUNT(SaleID) as CountBook,
			SUM(SalePrice) as Total
		from SaleDetails
		group by 
			SaleID
	) SD on SA.SaleID = SD.SaleID
	WHERE 
		S.StatusID = @statusID

end
GO
/****** Object:  StoredProcedure [dbo].[InsertBook]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[InsertBook]
	@Title varchar(100),
	@YearWritten int,
	@Author varchar(100),
	@Publisher varchar(100),
	@PublishedDate datetime,
	@Price decimal(10,2),
	@BookID INT OUTPUT
as
begin

	declare @statusID  int = 
	(
		select top 1
				StatusID
		from Status 
		where StatusCode = 'Active'
	)

	insert into Books
	(
		Title,
        YearWritten,
        Author,
        Publisher,
        PublishedDate,
        Price,
        StatusID
	)
	values
	(
		@Title,
		@YearWritten,
		@Author,
		@Publisher,
		@PublishedDate,
		@Price,
		@statusID
	)

	SET @BookID = SCOPE_IDENTITY();
end
GO
/****** Object:  StoredProcedure [dbo].[InsertClient]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[InsertClient]
	@FirstName varchar(50),
	@LastName varchar(50),
	@IdentificationNumber varchar(20),
	@Phone varchar(20),
	@Address varchar(100),
	@ClientID INT OUTPUT
as
begin
	declare @statusID  int = 
	(
		select top 1
				StatusID
		from Status 
		where StatusCode = 'Active'
	)

	insert into dbo.Clients
	(
		FirstName,
		LastName,
        IdentificationNumber,
        Phone,
        Address,
        StatusID
	)
	VALUES
	(
		@FirstName,
		@LastName,
		@IdentificationNumber,
		@Phone,
		@Address,
		@statusID
	)

	SET @ClientID = SCOPE_IDENTITY();
end
GO
/****** Object:  StoredProcedure [dbo].[InsertSale]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[InsertSale]
	@ClientID int,
	@SaleID INT OUTPUT
as
begin
	declare @statusID  int = 
	(
		select top 1
				StatusID
		from Status 
		where StatusCode = 'Completed'
	)

	insert into Sales
	(
		ClientID,
		SaleDate,
		StatusID
	)
	values
	(
		@ClientID,
		GetDate(),
		@statusID
	)

	SET @SaleID = SCOPE_IDENTITY();

end
GO
/****** Object:  StoredProcedure [dbo].[InsertSaleDetail]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[InsertSaleDetail]
	@SaleID int,
	@BookID int,
	@SalePrice decimal(10,2)
as
begin

	insert into SaleDetails
	(
		SaleID,
		BookID,
		SalePrice
	)
	values
	(
		@SaleID,
		@BookID,
		@SalePrice
	)
end
GO
/****** Object:  StoredProcedure [dbo].[UpdateBook]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[UpdateBook]
	@BookID int,
	@Title varchar(100),
	@YearWritten int,
	@Author varchar(100),
	@Publisher varchar(100),
	@PublishedDate datetime,
	@Price decimal(10,2),
	@StatusCode varchar(50)
as
begin

	declare @statusID  int = 
	(
		select top 1
				StatusID
		from Status 
		where StatusCode = @StatusCode
	)

	update Books 
	set
		Title = @Title,
        YearWritten = @YearWritten,
        Author = @Author,
        Publisher = @Publisher,
        PublishedDate = @PublishedDate,
        Price = @Price,
		Update_dt = GETDATE(),
        StatusID = @statusID
	where
		BookID = @BookID
end
GO
/****** Object:  StoredProcedure [dbo].[UpdateClient]    Script Date: 14/8/2024 3:56:43 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[UpdateClient]
	@ClientID int,
	@FirstName varchar(50),
	@LastName varchar(50),
	@IdentificationNumber varchar(20),
	@Phone varchar(20),
	@Address varchar(100),
	@StatusCode varchar(50)
as
begin

	declare @statusID  int = 
	(
		select top 1
				StatusID
		from Status 
		where StatusCode = @StatusCode
	)

	update Clients 
	set
		FirstName = @FirstName,
        LastName = @LastName,
        IdentificationNumber = @IdentificationNumber,
        Phone = @Phone,
        Address = @Address,
        StatusID = @statusID,
		Update_dt = GETDATE()
	where
		ClientID = @ClientID
end
GO
USE [master]
GO
ALTER DATABASE [BookStore] SET  READ_WRITE 
GO
