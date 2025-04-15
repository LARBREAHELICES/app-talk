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
