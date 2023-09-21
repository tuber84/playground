let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd /mnt/c/_proekty/JS/playground/vite_tets
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +35 /mnt/c/_proekty/JS/playground/vite_tets/index.html
badd +69 /mnt/c/_proekty/JS/playground/vite_tets/src/styles/index.css
badd +3 /mnt/c/_proekty/JS/playground/vite_tets/src/styles/light.css
argglobal
%argdel
edit /mnt/c/_proekty/JS/playground/vite_tets/src/styles/index.css
argglobal
balt /mnt/c/_proekty/JS/playground/vite_tets/src/styles/light.css
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
1,2fold
6,7fold
10,18fold
21,31fold
34,43fold
46,49fold
52,61fold
64,65fold
68,69fold
72,73fold
76,77fold
80,94fold
97,98fold
101,102fold
105,106fold
109,110fold
let &fdl = &fdl
let s:l = 14 - ((10 * winheight(0) + 27) / 54)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 14
normal! 010|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
