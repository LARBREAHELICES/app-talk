<?php

// src/Enum/TalkStatus.php

namespace App\Enum;

enum TalkStatus: string
{
    case Draft = 'draft';
    case Ready = 'ready';
    case Done  = 'done';

    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Brouillon',
            self::Ready => 'Prêt',
            self::Done  => 'Terminé',
        };
    }
}
