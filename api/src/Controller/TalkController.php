<?php

namespace App\Controller;

use App\Entity\Talk;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class TalkController extends AbstractController
{
    #[Route('/api/talks/all', name: 'app_talk_all')]
    public function index(EntityManagerInterface $manager): JsonResponse
    {
        $talks = $manager->getRepository(Talk::class)->findTasks();

        return $this->json([
            'talks' => $talks // Symfony convertira les objets en JSON automatiquement
        ], 200, [], ['groups' => 'talk:read']);
    }

    #[Route('/api/talks/futur', name: 'app_talk_futur')]
    public function lastTalks(EntityManagerInterface $manager): JsonResponse
    {
        $talks = $manager->getRepository(Talk::class)->findFuturTasks($limit = 3);

        return $this->json([
            'talks' => $talks // Symfony convertira les objets en JSON automatiquement
        ], 200, [], ['groups' => 'talk:read']);
    }

    #[Route('/api/talk/create', name: 'app_talk_save', methods: ['POST'])]
    public function saveTalk(EntityManagerInterface $manager, Request $request, UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $talk = new Talk();
        $talk->setTitle($data['title']);
        $talk->setDuration($data['duration']);
        $talk->setTopic($data['topic']);
        $talk->setObjective($data['objective']);

        if (!empty($data['scheduled_at'])) {
            $scheduledAt = new \DateTimeImmutable($data['scheduled_at']);
            $talk->setScheduledAt($scheduledAt);
        }

        if (!empty($data['presenters'])) {
            foreach ($data['presenters'] as $p) {
                // Vérifier si l'utilisateur existe déjà
                $existingUser = $userRepository->findOneBy(['email' => $p['email']]);
    
                if ($existingUser) {
                    return $this->json([
                        'error' => "L'utilisateur avec l'email {$p['email']} existe déjà."
                    ], 409); // Conflit
                }
    
                $user = new User();
                $user->setEmail($p['email']);
                $user->setUsername($p['username']);
    
                $talk->addPresenter($user);
            }
        }

        $manager->persist($talk);
        $manager->flush();

        return $this->json([
            'talk' =>  $talk,
            'response' => 'Ok',
            'messager' => ''
        ], 200, [], ['groups' => 'talk:read']);
    }

    #[Route('/api/talk/edit/{id}', name: 'app_talk_edit')]
    public function editTalk(Talk $talk): JsonResponse
    {
        return $this->json([
            'talk' => $talk // Symfony convertira les objets en JSON automatiquement
        ], 200, [], ['groups' => 'talk:read']);
    }
}
