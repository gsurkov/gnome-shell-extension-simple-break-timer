NAME=simple-break-timer
UUID=$(NAME)@gsurkov.github.io

PREFIX?=$(HOME)/.local
INSTALL_LOCATION=/share/gnome-shell/extensions/$(UUID)
INSTALL_PATH=$(DESTDIR)$(PREFIX)$(INSTALL_LOCATION)

FILES=$(wildcard schemas/*.compiled) \
	  $(wildcard icons/*.svg)        \
      $(wildcard *.js)               \
      metadata.json                  \
	  stylesheet.css                 

zip: schemas
	@echo Making zip...
	zip -r $(NAME).zip $(FILES)

install: schemas
	@echo Installing to $(INSTALL_PATH)
	mkdir -p $(INSTALL_PATH)
	cp --parents $(FILES) $(INSTALL_PATH)

uninstall:
	@echo Uninstalling from $(INSTALL_PATH)
	rm -rf $(INSTALL_PATH)

schemas:
	@echo Compiling schemas...
	glib-compile-schemas ./schemas

clean:
	rm -f $(NAME).zip
	rm schemas/*.compiled

.PHONY: schemas zip install uninstall clean
