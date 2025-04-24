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
                'scheduledAt' => new \DateTimeImmutable('+1 day'), // Programmé pour demain
            ],
            [
                'title' => 'Créer une interface moderne avec Shadcn/UI et Tailwind',
                'duration' => 25,
                'topic' => 'Tailwind css',
                'objective' => 'Découvrir comment Shadcn combine Tailwind CSS et Radix UI pour construire des composants accessibles et stylés rapidement.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user2],
                'scheduledAt' => new \DateTimeImmutable('+3 days'), // Programmé dans 3 jours
            ],
            [
                'title' => 'Go pour les développeurs web : le guide express',
                'duration' => 30,
                'topic' => 'Express',
                'objective' => 'Apprendre les bases de Go et comprendre pourquoi ce langage est idéal pour construire des API web performantes.',
                'status' => TalkStatus::Done,
                'presenters' => [$user2, $user3],
                'scheduledAt' => new \DateTimeImmutable('+5 days'), // Programmé dans 5 jours
            ],
            [
                'title' => 'Structurer une app Symfony moderne avec Docker et MySQL',
                'duration' => 20,
                'topic' => 'MySQL',
                'objective' => 'Mettre en place une stack de dev propre et scalable avec Symfony, Docker, et une base de données MySQL.',
                'status' => TalkStatus::Draft,
                'presenters' => [$user1],
                'scheduledAt' => new \DateTimeImmutable('+7 days'), // Programmé dans 7 jours
            ],
            [
                'title' => 'Optimiser les performances de React avec React Query et SWR',
                'duration' => 30,
                'topic' => 'React',
                'objective' => 'Apprendre à utiliser React Query et SWR pour optimiser la gestion des données dans une application React.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user1],
                'scheduledAt' => new \DateTimeImmutable('+9 days'),
            ],
            [
                'title' => 'Créer des applications avec GraphQL et Apollo Client',
                'duration' => 35,
                'topic' => 'GraphQL',
                'objective' => 'Découvrir comment construire des applications modernes avec GraphQL et Apollo Client.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user2],
                'scheduledAt' => new \DateTimeImmutable('+11 days'),
            ],
            [
                'title' => 'Comprendre l’architecture des microservices avec Docker et Kubernetes',
                'duration' => 45,
                'topic' => 'Microservices',
                'objective' => 'Explorer l’architecture des microservices et comment Docker et Kubernetes facilitent leur déploiement et gestion.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user3],
                'scheduledAt' => new \DateTimeImmutable('+13 days'),
            ],
            [
                'title' => 'Automatisation des tests avec Cypress et Jest',
                'duration' => 30,
                'topic' => 'Testing',
                'objective' => 'Apprendre à automatiser les tests dans vos applications avec Cypress et Jest.',
                'status' => TalkStatus::Draft,
                'presenters' => [$user1],
                'scheduledAt' => new \DateTimeImmutable('+15 days'),
            ],
            [
                'title' => 'Création d’applications mobiles avec React Native',
                'duration' => 40,
                'topic' => 'React Native',
                'objective' => 'Construire des applications mobiles avec React Native et les déployer sur iOS et Android.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user2],
                'scheduledAt' => new \DateTimeImmutable('+17 days'),
            ],
            [
                'title' => 'Architecture serveur sans serveur (Serverless) avec AWS Lambda',
                'duration' => 40,
                'topic' => 'Serverless',
                'objective' => 'Découvrir comment développer des applications sans serveur avec AWS Lambda.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user3],
                'scheduledAt' => new \DateTimeImmutable('+19 days'),
            ],
            [
                'title' => 'Gestion de l’état avec Redux Toolkit dans React',
                'duration' => 25,
                'topic' => 'Redux',
                'objective' => 'Apprendre à gérer l’état dans React avec Redux Toolkit pour des applications complexes.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user1],
                'scheduledAt' => new \DateTimeImmutable('+21 days'),
            ],
            [
                'title' => 'Optimisation des performances des applications web avec Lighthouse',
                'duration' => 30,
                'topic' => 'Performance',
                'objective' => 'Apprendre à utiliser Lighthouse pour auditer et optimiser la performance des applications web.',
                'status' => TalkStatus::Draft,
                'presenters' => [$user2],
                'scheduledAt' => new \DateTimeImmutable('+23 days'),
            ],
            [
                'title' => 'Création d’un blog complet avec Next.js et Markdown',
                'duration' => 30,
                'topic' => 'Next.js',
                'objective' => 'Construire un blog complet avec Next.js et Markdown pour une gestion de contenu facile.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user1],
                'scheduledAt' => new \DateTimeImmutable('+25 days'),
            ],
            [
                'title' => 'Mise en place de CI/CD avec GitHub Actions et Docker',
                'duration' => 45,
                'topic' => 'CI/CD',
                'objective' => 'Mettre en place une pipeline CI/CD avec GitHub Actions et Docker pour automatiser le déploiement.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user3],
                'scheduledAt' => new \DateTimeImmutable('+27 days'),
            ],
            [
                'title' => 'Sécuriser les applications React avec Auth0 et JWT',
                'duration' => 30,
                'topic' => 'Sécurité',
                'objective' => 'Apprendre à sécuriser vos applications React avec Auth0 et JWT.',
                'status' => TalkStatus::Done,
                'presenters' => [$user2],
                'scheduledAt' => new \DateTimeImmutable('+29 days'),
            ],
            [
                'title' => 'Développement avec Firebase pour les applications web',
                'duration' => 35,
                'topic' => 'Firebase',
                'objective' => 'Utiliser Firebase pour le développement d’applications web réactives et sécurisées.',
                'status' => TalkStatus::Draft,
                'presenters' => [$user1],
                'scheduledAt' => new \DateTimeImmutable('+31 days'),
            ],
            [
                'title' => 'Introduction à TypeScript avec React',
                'duration' => 25,
                'topic' => 'TypeScript',
                'objective' => 'Apprendre à utiliser TypeScript dans vos applications React pour une meilleure gestion des types.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user2],
                'scheduledAt' => new \DateTimeImmutable('+33 days'),
            ],
            [
                'title' => 'Migrer une app monolithique vers une architecture microservices',
                'duration' => 40,
                'topic' => 'Migration',
                'objective' => 'Découvrir les meilleures pratiques pour migrer une application monolithique vers une architecture microservices.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user3],
                'scheduledAt' => new \DateTimeImmutable('+35 days'),
            ],
            [
                'title' => 'Créer une API RESTful avec Node.js et Express',
                'duration' => 30,
                'topic' => 'API REST',
                'objective' => 'Construire une API RESTful avec Node.js et Express pour un backend scalable.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user1],
                'scheduledAt' => new \DateTimeImmutable('+37 days'),
            ],
            [
                'title' => 'Utiliser les WebSockets pour des applications en temps réel',
                'duration' => 30,
                'topic' => 'WebSockets',
                'objective' => 'Apprendre à utiliser les WebSockets pour des applications réactives et en temps réel.',
                'status' => TalkStatus::Ready,
                'presenters' => [$user2],
                'scheduledAt' => new \DateTimeImmutable('+39 days'),
            ],
        ];
        

        foreach ($talks as $data) {
            $talk = new Talk();
            $talk->setTitle($data['title']);
            $talk->setDuration($data['duration']);
            $talk->setTopic($data['topic']);
            $talk->setObjective($data['objective']);
            $talk->setStatus($data['status']);
            $talk->setScheduledAt($data['scheduledAt']);

            foreach ($data['presenters'] as $user) {
                $talk->addPresenter($user); 
            }

            $manager->persist($talk);
        }

        $manager->flush();
    }
}
