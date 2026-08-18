---
layout: page
title: projects
permalink: /projects/
description: Research projects in physical-signal intelligence, multimodal learning, industrial diagnosis, and robotic perception.
nav: true
nav_order: 2
horizontal: true
---

Each page presents the motivation, method overview, architecture, key results, and links to papers or code when publicly available.

<div class="projects">
  {% assign sorted_projects = site.projects | sort: "importance" %}
  <div class="container">
    <div class="row row-cols-1">
      {% for project in sorted_projects %}
        {% include projects_horizontal.liquid %}
      {% endfor %}
    </div>
  </div>
</div>
