let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd /mnt/c/_proekty/JS/playground
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +20 black&white\ theme\ autoSwitching/index.html
badd +1 black&white\ theme\ autoSwitching/css/style.css
badd +6 black&white\ theme\ autoSwitching/css/light.css
badd +9 b&w_manual_switching/index.html
badd +25 b&w_manual_switching/css/style.css
argglobal
%argdel
edit b&w_manual_switching/index.html
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 27 + 28) / 56)
exe '2resize ' . ((&lines * 26 + 28) / 56)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
11,14fold
16,19fold
3,20fold
23,24fold
30,35fold
37,43fold
45,50fold
27,52fold
22,53fold
2,54fold
let &fdl = &fdl
let s:l = 24 - ((23 * winheight(0) + 13) / 26)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 24
normal! 025|
wincmd w
argglobal
if bufexists(fnamemodify("black&white\ theme\ autoSwitching/index.html", ":p")) | buffer black&white\ theme\ autoSwitching/index.html | else | edit black&white\ theme\ autoSwitching/index.html | endif
if &buftype ==# 'terminal'
  silent file black&white\ theme\ autoSwitching/index.html
endif
balt b&w_manual_switching/css/style.css
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
11,14fold
16,19fold
3,20fold
22,23fold
2,24fold
let &fdl = &fdl
let s:l = 25 - ((24 * winheight(0) + 12) / 25)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 25
normal! 07|
wincmd w
exe '1resize ' . ((&lines * 27 + 28) / 56)
exe '2resize ' . ((&lines * 26 + 28) / 56)
if exists(':tcd') == 2 | tcd /mnt/c/_proekty/JS/playground/b&w_manual_switching | endif
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
