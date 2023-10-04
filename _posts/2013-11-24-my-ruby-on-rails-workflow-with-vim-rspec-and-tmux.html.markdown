---
title: My Ruby on Rails workflow with Vim, RSpec and Tmux
layout: post
tags: ruby on rails, rspec, vim, tmux, workflow
---
Remember the time when you learned you can compile a project in Turbo Pascal by pressing Ctrl-F5? Just by learning this one thing, you could save so much time! That was very mind-blowing realization for a young kid from Northern Finland.

## Less and Less Keystrokes

Fast forward to 2013, My basic workflow with Ruby on Rails is pretty much this:
- Write a test
- Run it
- Write some code against it
- Run the test again
- Repeat until it works

I am on a eternal quest for optimizing my workflow. I want to get maximal effect with minimal amount of keystrokes. However, finding the sweet spot of maximal productivity and time spent on configuring my development environment matters also. So, if you don't want to spend hours and hours to optimizing your development environment, [Sublime Text](http://www.sublimetext.com) is a excellent editor worth every penny.

I write my code in Vim. My .vimrc file is about 80 lines, and it has lots of comments. It's nothing fancy and I have just few plugins:

- [Nerdtree](https://github.com/scrooloose/nerdtree) for file navigation
- [ctrlp](http://kien.github.io/ctrlp.vim/) for fuzzy-search file finder
- [supertab](https://github.com/ervandew/supertab) for auto-completion
- [TSlime](https://github.com/kikijump/tslime.vim) for sending commands to Tmux
- [vim-rspec](https://github.com/thoughtbot/vim-rspec) to run RSpec tests from Vim

With these plugins, I can write code and navigate between files really fast. I'm using [vundle](https://github.com/gmarik/vundle) to handle my Vim plugins, but I've also used [pathogen](https://github.com/tpope/vim-pathogen) in the past to do the job.

## My Development Environment

When I start my development environment, Tmux opens three windows for me. First window has Vim, second window has automatic tests (RSpec) and third is running my local development server.

<table>
	<tr>
		<td style="text-align: center">
			<img src="/images/tmux-window-vim.png">
			<small>Window #1 - Vim</small>
		</td>
		<td style="text-align: center">
			<img src="/images/tmux-window-rspec.png">
			<small>Window #2 - RSpec</small>
		</td>
		<td style="text-align: center">
			<img src="/images/tmux-window-server.png">
			<small>Window #3 - Server</small>
		</td>
	</tr>
</table>

This is my shell script that opens three windows like in the pictures above.

```bash
#!/bin/bash
CURRENT_SESSION=${PWD##*/}

# Do we have Rakefile in the directory?
if [ ! -f Rakefile ]
then
  echo "Rakefile not found in current directory"
  exit 1;
fi

# Make sure there is a task to start up the server
if ! grep -q "task :server" Rakefile
then
  echo "No server task found in Rakefile"
  exit 1;
fi

# Start up the tmux session with specific name
tmux new-session -d -s $CURRENT_SESSION

# VIM window
tmux send-keys 'vim' 'C-m'
tmux rename-window vim

# RSpec window for running tests
tmux new-window
tmux rename-window rspec

# Window for running development server
tmux new-window
tmux rename-window server
tmux send-keys 'mailcatcher' 'C-m'
tmux send-keys 'rake server' 'C-m'

# Select the first window
tmux select-window -t 1

# Attach the tmux session
tmux attach -t $CURRENT_SESSION
```

I constantly switch between windows, using the Tmux keyboard shortcuts. I have slightly customized my Tmux, so I just press ```"Ctrl-a n"``` or ```"Ctrl-a p"``` to cycle through the windows. (Press 'control' and 'a' at the same time and then press 'n')

## Running RSpec from Vim

I like to run my tests from Vim just by pressing few keys. Since my laptop is quite slow, I don't like using any auto runners for my automatic tests. I usually work with one specific test scenario and I want to run it whenever I want to.

By running my tests from Vim, I save time and few keystrokes. If I am using a small screen (Macbook Air 11"), I have all my Tmux windows as a separate fullscreen windows. But when I have more screen estate, I share one window with Vim and RSpec. This way I don't have to do any window switching and my workflow is even faster. Once you learn to use it, you cannot write any code without it.

This is the reason why I have TSlime and vim-rspec plugins for Vim. If you want to read more how to set it up, read [this excellent article](http://robots.thoughtbot.com/running-specs-from-vim-sent-to-tmux-via-tslime) by [thoughtbot](http://www.thoughtbot.com).

If you are hungry for more workflow optimizations, listen Ruby Rogues episode [Sharpening Tools with Ben Orenstein](http://rubyrogues.com/129-rr-sharpening-tools-with-ben-orenstein/).

Remember, there is no speed limit.
