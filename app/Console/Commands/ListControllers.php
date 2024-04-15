<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Finder\Finder;

class ListControllers extends Command
{
    protected $signature = 'list:controllers';
    protected $description = 'Lists all controllers';

    public function handle()
    {
        $controllersPath = app_path('Http/Controllers');
        $finder = new Finder();
        $finder->files()->in($controllersPath);

        foreach ($finder as $file) {
            $this->line($file->getRelativePathname());
        }
    }
}
