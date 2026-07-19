/*
  Warnings:

  - You are about to drop the `Administrador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jogador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quadra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reserva` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_jogadorId_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_quadraId_fkey";

-- DropTable
DROP TABLE "Administrador";

-- DropTable
DROP TABLE "Jogador";

-- DropTable
DROP TABLE "Quadra";

-- DropTable
DROP TABLE "Reserva";

-- DropEnum
DROP TYPE "StatusQuadra";

-- DropEnum
DROP TYPE "StatusReserva";
