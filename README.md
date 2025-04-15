# Projet App music 

Pensez à créer le dossier `db_data`


Commande pour tout remettre à jour

```bash
docker compose down --volumes --remove-orphans && docker system prune -af --volumes
```

## Connexion à un conteneur 

```bash
docker exec -it php-app bash

# CLI de Symfony dans le conteneur 
curl -sS https://get.symfony.com/cli/installer | bash
mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

symfony check:requirements

composer --version
git config --global user.email "vous.vous@gmail.fr"
git config --global user.name "Vous"

symfony new . 
```

Pensez à installer react dans le dossier front avec la commande vitejs


## Activation des headers pour apache2

```bash
a2enmod headers
```

Pensez à relancer les services et à relancer le conteneur

```bash
service apache2 restart
```

## Base de données avec Symfony

```bash
composer require symfony/orm-pack
composer require --dev symfony/maker-bundle
php bin/console doctrine:database:create

composer require doctrine/doctrine-fixtures-bundle --dev

# security
composer require security

# cors
composer require nelmio/cors-bundle

# sérialise 
composer require symfony/serializer

```

fichier de configuration changez le fichier de base avec 
vim /etc/apache2/sites-available/000-default.conf 

```txt
<VirtualHost *:80>
    ServerName localhost

    DocumentRoot /var/www/html/public
    DirectoryIndex /index.php

    <Directory /var/www/html/public>
        AllowOverride All
        Order Allow,Deny
        Allow from All

        FallbackResource /index.php
    </Directory>

    # Ajouter les lignes suivantes pour transmettre l'en-tête Authorization
    SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
    RequestHeader set Authorization "%{HTTP_AUTHORIZATION}e" env=HTTP_AUTHORIZATION

    # Logs
    ErrorLog /var/log/apache2/project_error.log
    CustomLog /var/log/apache2/project_access.log combined

    # Définir l'environnement de l'application, optionnel mais utile
    # SetEnv APP_ENV prod
    # SetEnv APP_SECRET <app-secret-id>
    # SetEnv DATABASE_URL "mysql://db_user:db_pass@host:3306/db_name"
</VirtualHost>

```

## Entity pour sérialiser la réponse 

Pensez à le faire dans toutes les entités

```php
<?php

namespace App\Entity;

use App\Enum\TalkStatus;
use App\Repository\TalkRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TalkRepository::class)]
class Talk
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['talk:read'])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[Groups(['talk:read'])]
    #[ORM\Column(length: 255)]
    private ?string $topic = null;

    #[Groups(['talk:read'])]
    #[ORM\Column(nullable: true)]
    private ?int $duration = null;

    #[Groups(['talk:read'])]
    #[ORM\Column(nullable: true, enumType: TalkStatus::class)]
    private ?TalkStatus $status = null;

    #[Groups(['talk:read'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $objective = null;

    /**
     * @var Collection<int, User>
     */
    #[Groups(['talk:read'])]
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'talks')]
    private Collection $presenters;

    public function __construct()
    {
        $this->presenters = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getTopic(): ?string
    {
        return $this->topic;
    }

    public function setTopic(string $topic): static
    {
        $this->topic = $topic;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(?int $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getStatus(): ?TalkStatus
    {
        return $this->status;
    }

    public function setStatus(?TalkStatus $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getObjective(): ?string
    {
        return $this->objective;
    }

    public function setObjective(?string $objective): static
    {
        $this->objective = $objective;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getPresenters(): Collection
    {
        return $this->presenters;
    }

    public function addPresenter(User $presenter): static
    {
        if (!$this->presenters->contains($presenter)) {
            $this->presenters->add($presenter);
        }

        return $this;
    }

    public function removePresenter(User $presenter): static
    {
        $this->presenters->removeElement($presenter);

        return $this;
    }
}
```

## PHPUnit

La documentation pour les tests : [phpunit](https://docs.phpunit.de/en/12.0/)

- Installez composer avec PHP

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'.PHP_EOL; } else { echo 'Installer corrupt'.PHP_EOL; unlink('composer-setup.php'); exit(1); }"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

- Déplacez composer 
mv composer.phar /usr/local/bin/composer

Testez si tout marche bien

```bash
./vendor/bin/phpunit --version
```


- création du dossier des tests 

```bash
 mkdir tests
 ```

