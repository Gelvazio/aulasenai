//    This file is part of LightBot.
//
//    LightBot is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    LightBot is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with LightBot.  If not, see <http://www.gnu.org/licenses/>.
//    Authors : Lilian Gallon, Tristan Renaudon

#include "Application.h"


Application::Application(unsigned int w, unsigned int h, const std::wstring & title)
    :  m_window{sf::VideoMode({w, h}), title}, m_pressing_mouse{false}
{
}

void Application::stop() {
    m_running = false;
}

void Application::run()
{
    // 60 FPS
    m_window.setFramerateLimit(60);
    m_running = true;

    // While the user is playing
    while (m_running) {
        // Call the method correspondign to the user interaction
        process_events();
        // Call the method where we draw elements
        loop();
        if(m_pressing_mouse){
            // Call the mouse_pressing() method if the mouse is getting pressed
            mouse_pressing();
        }
        m_window.display();
    }
}

void Application::process_events()
{
    // If the window is closed, we stop the execution
    if (! m_window.isOpen()) {
        stop();
        return;
    }

    while (const std::optional event = m_window.pollEvent())
    {
        if (event->is<sf::Event::Closed>()) {
            stop();
        } else if (const auto* pressed = event->getIf<sf::Event::MouseButtonPressed>()) {
            m_pressing_mouse = true;
            set_mouse_coord(pressed->position.x, pressed->position.y);
            mouse_button_pressed();
        } else if (const auto* released = event->getIf<sf::Event::MouseButtonReleased>()) {
            m_pressing_mouse = false;
            set_mouse_coord(released->position.x, released->position.y);
            mouse_button_released();
        } else if (const auto* moved = event->getIf<sf::Event::MouseMoved>()) {
            set_mouse_coord(moved->position.x, moved->position.y);
            mouse_moved();
        }
    }
}

// Update m_mouse with the mouse position
void Application::set_mouse_coord(const int &x, const int &y)
{
    sf::Vector2f pos = m_window.mapPixelToCoords( {x, y});
    m_mouse = { (int)pos.x, (int)pos.y };
}
