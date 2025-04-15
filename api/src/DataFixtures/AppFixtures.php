<?php
// src/DataFixtures/AppFixtures.php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Talk;
use App\Enum\TalkStatus;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        // === Création de 3 users avec ROLE_PRESENTER ===
        $user1 = new User();
        $user1->setUsername('alice');
        $user1->setRoles(['ROLE_PRESENTER']);
        $user1->setEmail('alice@example.com'); 
        $user1->setPassword($this->hasher->hashPassword($user1, 'password'));
        $manager->persist($user1);

        $user2 = new User();
        $user2->setUsername('mehdi');
        $user2->setRoles(['ROLE_PRESENTER']);
        $user2->setEmail('mehdi@example.com'); // ✅ Ajout
        $user2->setPassword($this->hasher->hashPassword($user2, 'password'));
        $manager->persist($user2);

        $user3 = new User();
        $user3->setUsername('lucas');
        $user3->setRoles(['ROLE_PRESENTER']);
        $user3->setEmail('lucas@example.com'); // ✅ Ajout
        $user3->setPassword($this->hasher->hashPassword($user3, 'password'));
        $manager->persist($user3);

        $users = [$user1, $user2, $user3];

        // === Création des Talks reliés aux users ===
        $talks = [
            [
                'title' => 'Introduction à Zustand pour gérer l’état global en React',
                'duration' => 20,
                'topic' => 'Zustand',
                'objective' => 'Comprendre comment utiliser Zustand pour créer un store léger, rapide et sans boilerplate dans une app React.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user1],
            ],
            [
                'title' => 'Créer une interface moderne avec Shadcn/UI et Tailwind',
                'duration' => 25,
                'topic' => 'Tailwind css',
                'objective' => 'Découvrir comment Shadcn combine Tailwind CSS et Radix UI pour construire des composants accessibles et stylés rapidement.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user2],
            ],
            [
                'title' => 'Go pour les développeurs web : le guide express',
                'duration' => 30,
                'topic' => 'Express',

                'objective' => 'Apprendre les bases de Go et comprendre pourquoi ce langage est idéal pour construire des API web performantes.',
                'status' => TalkStatus::Done,
                'presenters' => [$user2, $user3],
            ],
            [
                'title' => 'Structurer une app Symfony moderne avec Docker et MySQL',
                'duration' => 20,
                'topic' => 'MySQL',
                'objective' => 'Mettre en place une stack de dev propre et scalable avec Symfony, Docker, et une base de données MySQL.',
                'status' => TalkStatus::Draft,
                'presenters' => [$user1],
            ],
        ];

        foreach ($talks as $data) {
            $talk = new Talk();
            $talk->setTitle($data['title']);
            $talk->setDuration($data['duration']);
            $talk->setTopic($data['topic']);
            $talk->setObjective($data['objective']);
            $talk->setStatus($data['status']);

            foreach ($data['presenters'] as $user) {
                $talk->addPresenter($user); 
            }

            $manager->persist($talk);
        }

        $manager->flush();
    }
}
