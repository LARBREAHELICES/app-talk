<?php

namespace App\Controller;

use App\Entity\Talk;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class TalkController extends AbstractController
{
    #[Route('/api/talks', name: 'app_talk')]
    public function index(EntityManagerInterface $manager): JsonResponse
    {
        $talks = $manager->getRepository(Talk::class)->findAll();


        return $this->json([
            'talks' => $talks // Symfony convertira les objets en JSON automatiquement
        ], 200, [], ['groups' => 'talk:read']);
    }
}
