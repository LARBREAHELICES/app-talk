<?php

namespace App\Repository;

use App\Entity\Talk;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Talk>
 */
class TalkRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Talk::class);
    }

    //    /**
    //     * @return Talk[] Returns an array of Talk objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('t')
    //            ->andWhere('t.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('t.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Talk
    //    {
    //        return $this->createQueryBuilder('t')
    //            ->andWhere('t.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }

    public function findFuturTasks(int $limit = 3): ?array
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.scheduled_at > :now')
            ->setParameter('now', new \DateTime()) 
            ->orderBy('t.scheduled_at', 'ASC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult() // Utiliser getResult() pour obtenir un tableau de résultats
        ;
    }

    public function findTasks(): ?array
{
    return $this->createQueryBuilder('t')
        ->andWhere('t.scheduled_at > :now')
        ->setParameter('now', new \DateTime()) // Définit le paramètre :now avec la date actuelle
        ->orderBy('t.scheduled_at', 'DESC') // Trie par date de manière décroissante
        ->getQuery()
        ->getResult(); // Retourne un tableau de résultats sans limite
}
}
